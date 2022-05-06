import React from "react";
import { Form, Field } from "react-final-form";

export default function Login(props) {

  const onSubmit = (inputs) => {
    console.log(inputs);
    props.handlePage("otpPage");
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
              />

              <button type="submit">Join</button>
            </form>
          )}
        />
      </div>
    </div>
  );
}
