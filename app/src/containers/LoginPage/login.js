import React from "react";

export default function Login(props) {
  return (
    <div className="login-page">
      <div className="form">
        <p>Chat</p>
        <form className="login-form">
          <input type="number" placeholder="Phone Number" name="phone" />

          <button type="submit" onClick={(e) => props.handlePage("otpPage")}>
            Join
          </button>
        </form>
      </div>
    </div>
  );
}
