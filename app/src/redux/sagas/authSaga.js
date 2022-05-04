import { put, takeEvery } from "redux-saga/effects";
import axios from "../../utilities/axios-config";
import { loginSuccess, loginError } from "../actions/auth";
import { LOGIN_REQUEST } from "../constants/auth";

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

function* authSaga() {
  yield takeEvery(LOGIN_REQUEST, loginCall);
}

export default authSaga;
