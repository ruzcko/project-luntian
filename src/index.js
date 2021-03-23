import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { FirestoreProvider } from "./contexts/FirestoreContext";

ReactDOM.render(
  <FirestoreProvider>
    <App />
  </FirestoreProvider>,
  document.getElementById("root")
);
