import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setIsAuthenticated } from "../store/authSlicer";
import "../apis/axios";

const Dashboard = () => {
  const [name, setName] = useState();
  const dispatch = useDispatch();
  async function getName() {
    try {
      const response = await axios.get("/dashboard");
      console.log(response);
      setName(response.data.user_name);
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    getName();
  }, []);
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    dispatch(setIsAuthenticated(false));
    toast.success("Logout Succesfully!");
  };
  return (
    <Fragment>
      <h1>Dashboard {name}</h1>
      <button className="btn btn-primary" onClick={(e) => logout(e)}>
        Logout
      </button>
    </Fragment>
  );
};

export default Dashboard;
