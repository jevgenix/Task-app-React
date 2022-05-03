import React, { createContext } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import FirebaseContext, { context } from "./firebaseConfig";

ReactDOM.render(
  <FirebaseContext.Provider value={context}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
