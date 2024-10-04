import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "./me.js";
import ThemeProvider from "./themes/index.jsx";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/AppContext.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import UserProvider from "./components/Library/action/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <ThemeProvider>
      <BrowserRouter>
        <AppContextProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </AppContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  </LocalizationProvider>
  // </React.StrictMode>
);
