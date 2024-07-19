import React from "react";
import ReactDOM from "react-dom/client";
import App from "./router/App";
import "./styles/index.css";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Set the base URL for axios
axios.defaults.baseURL = "https://virtserver.swaggerhub.com/KHARISMAJANUAR/MusicLab-API/1.0.0";

// Retrieve the Google Client ID from environment variables
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
