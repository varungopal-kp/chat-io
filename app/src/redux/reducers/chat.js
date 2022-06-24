import * as type from "../constants/chat";

const initialState = {
  chats: [],
  loading: false,
  error: null,
};

export default function chat(state = initialState, action) {
  switch (action.type) {
    case type.GET_CHAT_REQUEST:
      return {
        ...state,
        loading: true,
        chats: [],
      };
    case type.GET_CHAT_SUCCESS:
      return {
        ...state,
        chats: action.payload.data.data,
        loading: false,
      };
    case type.GET_CHAT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
