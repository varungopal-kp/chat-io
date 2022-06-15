import * as type from "../constants/auth";

const initialState = {
  auth: { otp: "", userId: null },
  loading: false,
  error: null,
  _token: false,
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
