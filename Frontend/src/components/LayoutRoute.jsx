import React from "react";
import { Route } from "react-router-dom";

import { Box } from "@mui/material";

import NavBar from "./NavBar";
import Footer from "./Footer";

function LayoutRoute(props) {
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

      {/* Site footer */}
      <Footer />
    </Box>
  );
}

export default LayoutRoute;
