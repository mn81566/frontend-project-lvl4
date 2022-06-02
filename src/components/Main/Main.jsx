import React, { Component, useContext } from "react";
import AuthContext from "../../contexts/AuthContext.js";

const Main = () => {
  const { isAuthorized } = useContext(AuthContext);
  console.log("isAuthorized", isAuthorized);

  return (
    <>
      <div>isAuthorized: {isAuthorized}</div>
      <div>Main page</div>
    </>
  );
};

export default Main;
