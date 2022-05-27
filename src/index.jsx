import React from "react";
import { render } from "react-dom";

import App from "./components/App.jsx";

import "core-js/stable/index.js";
import "regenerator-runtime/runtime.js";

import "../assets/application.scss";

if (process.env.NODE_ENV !== "production") {
  localStorage.debug = "chat:*";
}
// const container = document.getElementById('chat');
// const root = ReactDOM(container);
// root.render(<App/>);

const container = document.getElementById("chat");
render(<App />, container);
