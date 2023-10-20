import React, { useEffect } from "react";
import { Form, Field } from "react-final-form";
import { useDispatch, connect } from "react-redux";
import { login } from "../../redux/actions/auth";
import { NotificationManager } from "react-notifications";

export function Login(props) {
  const dispatch = useDispatch();

  const onSubmit = (inputs) => {
    try {      
      dispatch(login(inputs));
    } catch (error) {}
  };

  useEffect(() => {
    const otp = props.auth.auth.otp;    
    const userId = props.auth.auth.userId;    
    const phone = props.auth.auth.phone;    
    if (otp) {
      NotificationManager.success(`OTP: ${otp}`);
      localStorage.setItem("user", userId);
      localStorage.setItem("phone", phone);
      props.handlePage("otpPage");
    }
  }, [props.auth.auth.otp]);

  return (
    <div className="login-page">
      <div className="form">
        <p>Chat</p>
        <Form
          className="login-form"
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="phone"
                component="input"
                type="number"
                placeholder="Phone Number"
                required
              />

              <button type="submit">Join</button>
            </form>
          )}
        />
      </div>
    </div>
  );
}
export default connect((state) => ({
  auth: state.auth,
}))(Login);
