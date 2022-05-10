import * as type from "../constants/auth";

export function login(data) {
  return {
    type: type.LOGIN_REQUEST,
    payload: data,
  };
}
export function loginSuccess(data) {
  return {
    type: type.LOGIN_SUCCESS,
    payload: data,
  };
}
export function loginError(data) {
  return {
    type: type.LOGIN_FAILED,
    payload: data,
  };
}

export function verifyOtp(data) {
  return {
    type: type.OTP_VERIFY_REQUEST,
    payload: data,
  };
}
export function verifyOtpSuccess(data) {
  return {
    type: type.OTP_VERIFY_SUCCESS,
    payload: data,
  };
}
export function verifyOtpError(data) {
  return {
    type: type.OTP_VERIFY_FAILED,
    payload: data,
  };
}
