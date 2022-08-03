import axios from "axios";
import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { setIsAuthenticated } from "../store/authSlicer";
import "../apis/axios";

const Register = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/register", {
        name,
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        dispatch(setIsAuthenticated(true));
        toast.success("Register Succesfully!");
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <Fragment>
      <h1 className="text-center my-5">Register</h1>
      <form onSubmit={onSubmit}>
        <input
          className="form-control my-3"
          type="text"
          name="name"
          placeholder="Name & Surname"
          value={name}
          onChange={(e) => onChange(e)}
        />
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
          Register
        </button>
      </form>
      <Link to="/login">Login</Link>
    </Fragment>
  );
};

export default Register;
