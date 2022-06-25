import { put, takeEvery } from "redux-saga/effects";
import axios from "../../utilities/axios-config";
import {
  getChatSuccess,
  getChatError,
  chatSuccess,
  chatError,
} from "../actions/chat";
import { GET_CHAT_REQUEST, CHAT_REQUEST } from "../constants/chat";

function* getChatCall({ payload }) {
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

function* chatCall({ payload }) {
  
  try {
    const chats = yield axios
      .post(`chats`, payload)
      .then((res) => {
        return res;
      })
      .catch(function (response) {
        return Promise.reject(response);
      });
    yield put(chatSuccess(chats));
  } catch (error) {
    yield put(chatError(error));
  }
}

function* chatSaga() {
  yield takeEvery(CHAT_REQUEST, chatCall);
  yield takeEvery(GET_CHAT_REQUEST, getChatCall);
}

export default chatSaga;
