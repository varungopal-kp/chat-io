import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const user = localStorage.getItem("user");
const socket = io("http://localhost:5000", { query: `user=${user}` });

socket.on("connect", () => {
  console.log(socket.id);
});

socket.on("receive_msg", (msg) => {
  console.log(msg);
});

export default function Index(props) {
  const [message, updateMessage] = useState("");
  const [receiver, updateReceiver] = useState("");
  const [chatList, updateChatList] = useState([]);

  useEffect(() => {    
    updateChatList(props.chats);
  }, [props.chats]);

  const sendMessage = () => {
    socket.emit("send_msg", { message, user, receiver });
    updateMessage("");
  };

  const handleChatListClick = (id) => {
    updateReceiver(id);
    props.getUserChats(id);
  };

  const usersList = props.users;
console.log(chatList)
  return (
    <div className="container">
      <h3 className=" text-center">Chat i/o</h3>
      <div className="messaging">
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
                  />
                  <span className="input-group-addon">
                    <button type="button">
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
                      className="chat_list active_chat"
                      key={i}
                      onClick={(e) => handleChatListClick(_a._id)}
                    >
                      <div className="chat_people">
                        <div className="chat_img">
                          <img
                            src="https://ptetutorials.com/images/user-profile.png"
                            alt="sunil"
                          />
                        </div>
                        <div className="chat_ib">
                          <h5>
                            {_a.phone}{" "}
                            <span className="chat_date">
                              {_a.chat ? _a.chat.createdAt : ""}
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
            <div className="msg_history">
              <div className="incoming_msg">
                <div className="incoming_msg_img">
                  <img
                    src="https://ptetutorials.com/images/user-profile.png"
                    alt="sunil"
                  />
                </div>
                <div className="received_msg">
                  <div className="received_withd_msg">
                    <p>Test which is a new approach to have all solutions</p>
                    <span className="time_date"> 11:01 AM | June 9</span>
                  </div>
                </div>
              </div>
              <div className="outgoing_msg">
                <div className="sent_msg">
                  <p>Test which is a new approach to have all solutions</p>
                  <span className="time_date"> 11:01 AM | June 9</span>
                </div>
              </div>
            </div>
            <div className="type_msg">
              <div className="input_msg_write">
                <input
                  type="text"
                  className="write_msg"
                  placeholder="Type a message"
                  onChange={(e) => updateMessage(e.target.value)}
                />
                <button
                  className="msg_send_btn"
                  type="button"
                  onClick={(e) => sendMessage()}
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
