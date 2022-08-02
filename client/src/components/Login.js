import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { setIsAuthenticated } from "../store/authSlicer";

const Login = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };

      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        dispatch(setIsAuthenticated(true))
        toast.success("Login Succesfully!");
      } else {
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Fragment>
      <h1 className="text-center my-5">Login</h1>
      <form onSubmit={onSubmitForm}>
        <input
          className="form-control my-3"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => onChange(e)}
        />
        <input
          className="form-control my-3"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <button type="submit" className="btn btn-block btn-primary">
          Login
        </button>
      </form>
      <Link to="/register">Register</Link>
    </Fragment>
  );
};

export default Login;
