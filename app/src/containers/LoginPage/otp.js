import React, { useEffect } from "react";
import { Form, Field } from "react-final-form";
import { useDispatch, connect } from "react-redux";
import { verifyOtp } from "../../redux/actions/auth";
import { NotificationManager } from "react-notifications";

export function Otp(props) {
  const dispatch = useDispatch();

  const onSubmit = (inputs) => {
    try {
      const userId = props.auth.auth.userId;
      inputs.userId = userId;
      dispatch(verifyOtp(inputs));
    } catch (error) {}
  };

  useEffect(() => {
    const _token = props.auth._token;
    if (_token) {
      NotificationManager.success(`Login Successful`);
      localStorage.setItem("_token", _token);
      window.location.href = "/";
    }
  }, [props.auth._token]);

  return (
    <div className="login-page">
      <div className="form">
        <p>OTP</p>
        <Form
          className="login-form"
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="otp"
                component="input"
                type="number"
                placeholder="OTP"
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
}))(Otp);
