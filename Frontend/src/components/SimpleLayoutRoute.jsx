import React from "react";
import { Route } from "react-router-dom";

import { Box } from "@mui/material";

import NavBar from "./NavBar";

function SimpleLayoutRoute(props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* Site navigation */}
      <NavBar />

      {/* Page content */}
      <Route
        path={props.path}
        exact={props.exact}
        component={props.component}
      />
    </Box>
  );
}

export default SimpleLayoutRoute;
