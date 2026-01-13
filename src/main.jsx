import React from "react";
import ReactDom from "react-dom/client";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./mainstyle.css";

ReactDom.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="490732667124-ineqeid9nlmoq7olqb6iq36hd2k632f2.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
