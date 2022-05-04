import * as type from '../constants/auth';

export function login(data) {
  return { 
    type: type.LOGIN_REQUEST,
    payload: data,
  }
}
export function loginSuccess(data) {
  return { 
    type: type.LOGIN_SUCCESS,
    payload: data,
  }
}
export function loginError(data) {
  return { 
    type: type.LOGIN_FAILED,
    payload: data,
  }
}