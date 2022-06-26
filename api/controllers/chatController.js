const mongoose = require("mongoose");
const Chat = require("../models/Chat");

const { errorResponse } = require("../helpers/errorResponseHandler");

exports.getUserChat = async (req, res, next) => {
  try {
    const userId = req.auth.data._id;
    const { id } = req.params;

    const chats = await Chat.find({
      $or: [
        {
          sender: userId,
          receiver: id,
        },
        {
          sender: id,
          receiver: userId,
        },
      ],
    }).sort({ createdAt: 1 });
    return res.status(200).json({
      success: true,
      message: "Successfull",
      data: chats,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

exports.chat = async (req, res, next) => {
  try {
    let inputParams = req.body;

    const chat = await Chat.create(inputParams);
    return res.status(200).json({
      success: true,
      message: "Successfull",
      data: chat,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};
