import React, { useState } from "react";
import CardForm from "./CardForm/CardForm";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const inputs = [
    {
      id: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "Enter your first name",
      onChange: (e) => setFirstName(e.target.value),
      value: firstName,
    },
    {
      id: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Enter your last name",
      onChange: (e) => setEmail(e.target.value),
      value: firstName,
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "Your email address",
      onChange: (e) => setEmail(e.target.value),
      value: email,
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      onChange: (e) => setPassword(e.target.value),
      value: password,
    },
    {
      id: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Enter your password",
      onChange: (e) => setPassword(e.target.value),
      value: password,
    },
  ];
  return (
    <CardForm
      heading="Create Account"
      inputs={inputs}
      submitText="Create Account"
      onSubmit={handleSubmit}
      cardCheckboxHtml={
        <div className="cardForm__checkboxWrapper">
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            I accept <Link to="/">Terms and Conditions</Link>
          </label>
        </div>
      }
      cardFooterHtml={
        <>
          <span>Already have an account? </span>
          <Link to="/auth/signin">Login</Link>
        </>
      }
    />
  );
};

export default SignUp;
