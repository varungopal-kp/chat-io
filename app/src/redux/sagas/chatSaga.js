import { put, takeEvery } from "redux-saga/effects";
import axios from "../../utilities/axios-config";
import { getChatSuccess, getChatError } from "../actions/chat";
import { GET_CHAT_REQUEST } from "../constants/chat";

function* chatCall({ payload }) {
  try {
    const chats = yield axios
      .get(`chats/getUserChat/${payload}`, payload)
      .then((res) => {
        return res;
      })
      .catch(function (response) {
        return Promise.reject(response);
      });
    yield put(getChatSuccess(chats));
  } catch (error) {
    yield put(getChatError(error));
  }
}

function* authSaga() {
  yield takeEvery(GET_CHAT_REQUEST, chatCall);
}

export default authSaga;
