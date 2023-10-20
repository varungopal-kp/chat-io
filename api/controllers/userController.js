const mongoose = require("mongoose");
const User = require("../models/User");
const Chat = require("../models/Chat");
const { errorResponse } = require("../helpers/errorResponseHandler");
const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  let params = req.body;
  try {
    const user = await User.findOne({ phone: params.phone });
    params.otp = otpGenerator();

    if (user) {
      user.otp = params.otp;
      user.save();
    } else {
      await User.create(params);
    }

    return res
      .status(200)
      .json({ otp: params.otp, userId: user._id, phone: params.phone });
  } catch (error) {
    console.error(error);
    return errorResponse(res, error);
  }
};

exports.verifyOtp = async (req, res, next) => {
  let params = req.body;
  try {
    const user = await User.findOne({ otp: params.otp, _id: params.userId });
    if (user) {
      const token = jwt.sign(
        {
          data: user,
        },
        process.env.JWT_KEY,
        {
          expiresIn: 604800, //1 week
        }
      );
      user._token = token;
      user.save();
      return res.status(200).json({
        success: true,
        message: "Successfully Logged In. ",
        token: token,
      });
    }
    return res.status(400).json({
      success: false,
      message: "Failed. ",
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

function otpGenerator() {
  return Math.floor(1000 + Math.random() * 9000);
}

exports.getAll = async (req, res, next) => {
  try {
    const userId = req.auth?.data?._id;
    const users = await User.find({ _id: { $ne: userId } }).lean();
    for (const _a of users) {
      const latestChat = await Chat.findOne({
        $or: [
          {
            sender: userId,
            receiver: _a._id,
          },
          {
            sender: _a._id,
            receiver: userId,
          },
        ],
      }).sort({ createdAt: -1 });
      _a.chat = latestChat;
    }

    return res.status(200).json({
      success: true,
      message: "Successfull",
      data: users,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};
