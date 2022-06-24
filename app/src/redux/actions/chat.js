import * as type from "../constants/chat";

export function getChats(data) {
  return {
    type: type.GET_CHAT_REQUEST,
    payload: data,
  };
}
export function getChatSuccess(data) {
  return {
    type: type.GET_CHAT_SUCCESS,
    payload: data,
  };
}
export function getChatError(data) {
  return {
    type: type.GET_CHAT_FAILED,
    payload: data,
  };
}
