import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";

import CartContextProvider from "./components/CartContext";
import { UserContextProvider } from "./components/UserContext";

// Create the React root element
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* Global shopping cart state */}
    <CartContextProvider>
      {/* Global user authentication state */}
      <UserContextProvider>
        {/* Main application */}
        <App />
      </UserContextProvider>
    </CartContextProvider>
  </React.StrictMode>,
);
