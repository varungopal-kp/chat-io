import * as type from "../constants/auth";

const initialState = {
  auth: { otp: "" },
  loading: false,
  error: null,
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
        };
      case type.OTP_VERIFY_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case type.OTP_VERIFY_FAILED:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
    default:
      return state;
  }
}
