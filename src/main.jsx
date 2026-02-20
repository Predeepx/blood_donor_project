import React from "react";
import ReactDom from "react-dom/client";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./mainstyle.css";
import "leaflet/dist/leaflet.css";

ReactDom.createRoot(document.getElementById("root")).render(<App />);
