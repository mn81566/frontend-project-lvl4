// const React = require("react");
import React from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import NoMatch from "./NoMatch/NoMatch";
import { Button } from "react-bootstrap";
import { useAuth } from "react-use-auth";

const REACT_VERSION = React.version;

const logOut = (auth) => {
  localStorage.removeItem("token");
  // setLoggedIn(false);
  auth.logout();
};

const AuthButton = () => {
  const auth = useAuth();
  const location = useLocation();
  const isTokenExists = localStorage.getItem("token");

  return isTokenExists ? (
    <Button onClick={() => logOut(auth)}>Log out</Button>
  ) : (
    <Button as={Link} to="/login" state={{ from: location }}>
      Login
    </Button>
  );
};

const App = () => {
  const AuthContext = React.createContext({});

  return (
    <AuthContext.Provider value={{}}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <AuthButton />
              </li>
            </ul>
          </nav>

          {/* A <Routes> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="*" element={<NoMatch />}></Route>
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
