import React from "react";
import { Redirect, Route } from "react-router-dom";

import { Box } from "@mui/material";

import NavBar from "./NavBar";
import { UserContext } from "./UserContext";

function GuestLayoutRoute(props) {
  const { loggedIn } = React.useContext(UserContext);

  // Only allow guests to access this route
  if (!loggedIn) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <NavBar />

        {/* Render requested page */}
        <Route
          path={props.path}
          exact={props.exact}
          component={props.component}
        />
      </Box>
    );
  } else {
    // Redirect logged in users
    return <Redirect to={"/"} />;
  }
}

export default GuestLayoutRoute;
