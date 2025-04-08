import React, { useState } from "react";

const SignInApi = () => {
  const apiUrl = "https://localhost:7285/api/auth/login";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [users, setUsers] = useState([]);

  const signIn = async (e) => {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.status === 200) {
      const data = await response.json();
      localStorage.setItem("accesstoken", data.token);
    }
  };
  const getUsers = async () => {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn(e);
    await getUsers();
    console.log(users);
    console.log(formData);
  };

  return <div>signIn</div>;
};

export default SignInApi;
