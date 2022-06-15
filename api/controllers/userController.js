const User = require("../models/User");
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

    return res.status(200).json({ otp: params.otp, userId: user._id });
  } catch (error) {
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
