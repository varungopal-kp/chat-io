const User = require("../models/User");
const { errorResponse } = require("../helpers/errorResponseHandler");

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

    return res.status(200).json({ otp: params.otp });
  } catch (error) {
    return errorResponse(res, error);
  }
};

function otpGenerator() {
  return Math.floor(1000 + Math.random() * 9000);
}
