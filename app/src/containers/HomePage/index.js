import React, { useEffect } from "react";
import "./home.css";
import ChatBox from "../../components/ChatBox";
import { useDispatch, connect } from "react-redux";
import { getUsers } from "../../redux/actions/user";
import { getChats, chatSend } from "../../redux/actions/chat";

export function Index(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const getUserChats = (id) => {
    dispatch(getChats(id));
  };

  const handleChatSend = (data) => {
    dispatch(chatSend(data));
  };

  return (
    <ChatBox
      users={props.users}
      getUserChats={getUserChats}
      chats={props.chats}
      handleChatSend={handleChatSend}
    />
  );
}

export default connect((state) => ({
  auth: state.auth,
  users: state.user.users,
  chats: state.chat.chats,
}))(Index);
