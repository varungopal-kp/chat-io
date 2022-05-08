import React from "react";
import { Form, Field } from "react-final-form";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/actions/auth";

export default function Login(props) {
  const dispatch = useDispatch();

  const onSubmit = (inputs) => {
    try {
      console.log(inputs);
      props.handlePage("otpPage");
      dispatch(login(inputs));
    } catch (error) {}
  };

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
