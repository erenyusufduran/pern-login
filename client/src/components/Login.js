import axios from "axios";
import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { setIsAuthenticated } from "../store/authSlicer";
import "../apis/axios";

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
      const response = await axios.post("/auth/login", {
        email,
        password,
      });
      console.log(response);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        dispatch(setIsAuthenticated(true));
        toast.success("Login Succesfully!");
      } else {
        toast.error(response.data);
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
