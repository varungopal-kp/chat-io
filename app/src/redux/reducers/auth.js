import * as type from "../constants/auth";

const _token = localStorage.getItem("_token") || false;
const user = localStorage.getItem("user") || false;
const phone = localStorage.getItem("phone") || false;

const initialState = {
  auth: { otp: "", userId: user, phone: phone },
  loading: false,
  error: null,
  _token: _token,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case type.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case type.LOGIN_SUCCESS:
      return {
        ...state,
        auth: action.payload.data,
        loading: false,
      };
    case type.LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case type.OTP_VERIFY_REQUEST:
      return {
        ...state,
        loading: true,
        _token: false,
      };
    case type.OTP_VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        _token: action.payload.data.token,
      };
    case type.OTP_VERIFY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        _token: false,
      };
    default:
      return state;
  }
}
