import React from "react";

export default function index() {
  require('./style.css')

  return (
    <div className="login-page">
      <div className="form">
          <p>Chat</p>
        <form className="login-form">
          <input type="number" placeholder="Phone Number" name="phone" />

          <button type="submit">Join</button>
        </form>
      </div>
    </div>
  );
}
