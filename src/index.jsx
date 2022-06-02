import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import App from "./components/App.jsx";
import store from "./slices/index.js";

import "core-js/stable/index.js";
import "regenerator-runtime/runtime.js";

import "../assets/application.scss";

if (process.env.NODE_ENV !== "production") {
  localStorage.debug = "chat:*";
}

const container = document.getElementById("chat");
render(
  <Provider store={store}>
    <App />
  </Provider>,
  container
);
