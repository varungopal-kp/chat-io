import React from 'react'

export default function Otp(props) {
  return (
    <div className="login-page">
      <div className="form">
        <p>Chat</p>
        <form className="login-form">
          <input type="number" placeholder="Enter OTP" name="otp" />

          <button type="submit" onClick={e=>props.handlePage('otpPage')}>Confirm</button>
        </form>
      </div>
    </div>
  )
}
