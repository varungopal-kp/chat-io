import React from "react";
import { Form, Field } from "react-final-form";
import { useDispatch } from "react-redux";
import { verifyOtp } from "../../redux/actions/auth";

export default function Otp(props) {
  const dispatch = useDispatch();

  const onSubmit = (inputs) => {
    try {
      dispatch(verifyOtp(inputs));
    } catch (error) {}
  };

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
