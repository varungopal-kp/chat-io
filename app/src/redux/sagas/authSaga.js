import { put, takeEvery } from "redux-saga/effects";
import axios from "../../utilities/axios-config";
import {
  loginSuccess,
  loginError,
  verifyOtpError,
  verifyOtpSuccess,
} from "../actions/auth";
import { LOGIN_REQUEST, OTP_VERIFY_REQUEST } from "../constants/auth";

function* loginCall({ payload }) {
  try {
    const login = yield axios
      .post(`auth`, payload)
      .then((res) => {
        return res;
      })
      .catch(function (response) {
        return Promise.reject(response);
      });
    yield put(loginSuccess(login));
  } catch (error) {
    yield put(loginError(error));
  }
}

function* verifyCall({ payload }) {
  try {
    const token = yield axios
      .post(`auth/verify-otp`, payload)
      .then((res) => {
        return res;
      })
      .catch(function (response) {
        return Promise.reject(response);
      });
    yield put(verifyOtpSuccess(token));
  } catch (error) {
    yield put(verifyOtpError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_REQUEST, loginCall);
  yield takeEvery(OTP_VERIFY_REQUEST, verifyCall);
}

export default authSaga;
