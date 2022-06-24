import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import chat from "./chat";

const rootReducer = combineReducers({ auth, user, chat });

export default rootReducer;
