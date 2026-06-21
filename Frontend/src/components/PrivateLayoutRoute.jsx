import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import { Box } from "@mui/material";

import Navbar from "../components/NavBar";
import { UserContext } from "./UserContext";

function PrivateLayoutRoute(props) {
  const { loggedIn } = useContext(UserContext);

  // Only allow authenticated users
  if (loggedIn) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Navbar />

        {/* Protected page */}
        <Route
          path={props.path}
          exact={props.exact}
          component={props.component}
        />
      </Box>
    );
  } else {
    // Redirect guests
    return <Redirect to={"/"} />;
  }
}

export default PrivateLayoutRoute;
