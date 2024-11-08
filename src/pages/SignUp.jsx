import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  function handleFormSubmit(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const username = event.target.username.value;
    const password = event.target.password.value;

    axios
      .post("https://backend-ecom-8ro1.onrender.com/user/signup", {
        email,
        username,
        password,
      })
      .then((res) => {
        const data = res.data;

        localStorage.setItem("token", data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <main className="w-full h-full flex items-center justify-center text-white">
      <form action="" onSubmit={handleFormSubmit}>
        <h1> Sign Up</h1>
        <div className="my-3 flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            className="p-2 rounded-md outline-none bg-slate-800 text-white"
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="my-3 flex flex-col gap-1">
          <label htmlFor="username">Username</label>
          <input
            className="p-2 rounded-md outline-none bg-slate-800 text-white"
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username"
          />
        </div>
        <div className="my-3 flex flex-col gap-1">
          <label htmlFor="password">password</label>
          <input
            className="p-2 rounded-md outline-none bg-slate-800 text-white"
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
          />
        </div>
        <button
          className="w-full p-2 rounded-md bg-slate-800 text-white"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </main>
  );
}

export default SignUp;
