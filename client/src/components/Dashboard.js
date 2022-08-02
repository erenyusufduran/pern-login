import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setIsAuthenticated } from "../store/authSlicer";

const Dashboard = () => {
  const [name, setName] = useState();
  const dispatch = useDispatch();
  async function getName() {
    try {
      const response = await fetch("http://localhost:8000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      setName(parseRes.user_name);
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
