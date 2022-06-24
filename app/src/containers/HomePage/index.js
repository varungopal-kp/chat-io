import React, { useEffect } from "react";
import "./home.css";
import ChatBox from "../../components/ChatBox";
import { useDispatch, connect } from "react-redux";
import { getUsers } from "../../redux/actions/user";
import { getChats } from "../../redux/actions/chat";

export function Index(props) {
  const dispatch = useDispatch();

  useEffect(() => {    
    dispatch(getUsers());
  }, []);

  const getUserChats = (id) => {
    dispatch(getChats(id));
  };

  return (
    <ChatBox
      users={props.users}
      getUserChats={getUserChats}
      chats={props.chats}
    />
  );
}

export default connect((state) => ({
  auth: state.auth,
  users: state.user.users,
  chats: state.chat.chats,
}))(Index);
