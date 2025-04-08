import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import CardForm from "./CardForm/CardForm";
import { Link } from "react-router-dom";

const SignIn = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const succeeded = await signIn(email, password);
    if (succeeded) console.log("inloggning lyckades");
    else console.log("inloggning misslyckades");
  };

  const inputs = [
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
  ];

  return (
    <CardForm
      heading="Login"
      inputs={inputs}
      submitText="Login"
      onSubmit={handleSubmit}
      cardFooterHtml={
        <>
          <span>Don't have an account? </span>
          <Link to="/auth/signup">Sign up</Link>
        </>
      }
    />
  );
};

export default SignIn;
