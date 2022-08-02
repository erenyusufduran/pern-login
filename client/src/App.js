import "./App.css";
import { Fragment, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated } from "./store/authSlicer";

toast.configure();

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:8000/auth/is-verify/", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      parseRes === true
        ? dispatch(setIsAuthenticated(true))
        : dispatch(setIsAuthenticated(false));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <Fragment>
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route
              exact
              path="/login"
              render={(props) =>
                !isAuthenticated ? (
                  <Login {...props} />
                ) : (
                  <Redirect to="/" />
                )
              }
            ></Route>
            <Route
              exact
              path="/register"
              render={(props) =>
                !isAuthenticated ? (
                  <Register {...props} />
                ) : (
                  <Redirect to="/" />
                )
              }
            ></Route>
            <Route
              exact
              path="/"
              render={(props) =>
                isAuthenticated ? (
                  <Dashboard {...props} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            ></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
