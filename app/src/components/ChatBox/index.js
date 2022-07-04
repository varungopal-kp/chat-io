import React, { useEffect, useState, useRef } from "react";
import Logout from "../Logout";
import { io } from "socket.io-client";

const user = localStorage.getItem("user");
const socket = io("http://localhost:5000", { query: `user=${user}` });

socket.on("connect", () => {
  console.log(socket.id);
});

export default function Index(props) {
  const [message, updateMessage] = useState("");
  const [receiver, updateReceiver] = useState("");
  const [chatList, updateChatList] = useState([]);
  const chatListRef = useRef(chatList);

  useEffect(() => {
    updateChatList(props.chats);
  }, [props.chats]);

  useEffect(() => {
    chatListRef.current = chatList;
  });

  useEffect(() => {
    socket.on("receive_msg", (data) => {
      const newChatList = [...chatListRef.current];
      newChatList.push(data);
      updateChatList(newChatList);
    });
  }, []);

  const sendMessage = () => {
    const data = {
      sender: user,
      receiver,
      message,
    };
    props.handleChatSend(data);
    socket.emit("send_msg", { message, user, receiver });
    updateMessage("");
  };

  const handleChatListClick = (id) => {
    updateReceiver(id);
    props.getUserChats(id);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const usersList = props.users;

  return (
    <div className="container">
      <h3 className=" text-center">Chat i/o </h3>
      <div className="messaging">
        <Logout handleLogout={handleLogout} />
        <div className="inbox_msg">
          <div className="inbox_people">
            <div className="headind_srch">
              <div className="recent_heading">
                <h4>Recent</h4>
              </div>
              <div className="srch_bar">
                <div className="stylish-input-group">
                  <input
                    type="text"
                    className="search-bar"
                    placeholder="Search"
                    disabled
                  />
                  <span className="input-group-addon">
                    <button type="button" disabled>
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <div className="inbox_chat">
              {usersList.length
                ? usersList.map((_a, i) => (
                    <div
                      className={
                        _a._id == receiver
                          ? "chat_list active_chat"
                          : "chat_list"
                      }
                      key={i}
                      onClick={(e) => handleChatListClick(_a._id)}
                    >
                      <div className="chat_people">
                        <div className="chat_img">
                          <img
                            src="https://ptetutorials.com/images/user-profile.png"
                            alt="pro"
                          />
                        </div>
                        <div className="chat_ib">
                          <h5>
                            {_a.phone}{" "}
                            <span className="chat_date">
                              {_a.chat
                                ? new Date(
                                    _a.chat.createdAt
                                  ).toLocaleDateString()
                                : ""}
                            </span>
                          </h5>
                          <p>{_a.chat ? _a.chat.message : ""}</p>
                        </div>
                      </div>
                    </div>
                  ))
                : ""}
            </div>
          </div>
          <div className="mesgs">
            <div className="msg_history" id="msg_history">
              {chatList.length
                ? chatList.map((_a) => {
                    return (
                      <React.Fragment key={_a._id}>
                        {_a.sender == user ? (
                          <div className="outgoing_msg">
                            <div className="sent_msg">
                              <p>{_a.message}</p>
                              <span className="time_date">
                                {" "}
                                {new Date(_a.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="incoming_msg">
                            <div className="incoming_msg_img">
                              <img
                                src="https://ptetutorials.com/images/user-profile.png"
                                alt="sunil"
                              />
                            </div>
                            <div className="received_msg">
                              <div className="received_withd_msg">
                                <p>{_a.message}</p>
                                <span className="time_date">
                                  {new Date(_a.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })
                : ""}
            </div>
            <div className="type_msg">
              <div className="input_msg_write">
                <input
                  type="text"
                  className="write_msg"
                  placeholder="Type a message"
                  onChange={(e) => updateMessage(e.target.value)}
                  value={message}
                  disabled={!receiver}
                />
                <button
                  className="msg_send_btn"
                  type="button"
                  onClick={(e) => sendMessage()}
                  disabled={!receiver || !message}
                >
                  <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
