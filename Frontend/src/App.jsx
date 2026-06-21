import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import LayoutRoute from "./components/LayoutRoute";
import GuestLayoutRoute from "./components/GuestLayoutRoute";
import PrivateLayoutRoute from "./components/PrivateLayoutRoute";
import SimpleLayoutRoute from "./components/SimpleLayoutRoute";

import HomeScreen from "./pages/HomeScreen";
import DonateScreen from "./pages/DonateScreen";
import VolunteerScreen from "./pages/VolunteerScreen";
import RegistrationScreen from "./pages/RegistrationScreen";
import LoginScreen from "./pages/LoginScreen";
import ProductListScreen from "./pages/ProductListScreen";
import ProductScreen from "./pages/ProductScreen";
import CartScreen from "./pages/CartScreen";
import ProfileScreen from "./pages/ProfileScreen";
import CheckoutScreen from "./pages/CheckoutScreen";
import OrderSuccessScreen from "./pages/OrderSuccessScreen";
import ErrorScreen from "./pages/ErrorScreen";

function App() {
  return (
    <BrowserRouter>
      {/* Scroll to top when navigating between pages */}
      <ScrollToTop />

      {/* Application routes */}
      <Switch>
        {/* Public pages with navbar and footer */}
        <LayoutRoute path="/" exact component={HomeScreen} />
        <LayoutRoute path="/donate" exact component={DonateScreen} />
        <LayoutRoute path="/volunteer" exact component={VolunteerScreen} />
        <LayoutRoute path="/cart" exact component={CartScreen} />
        <LayoutRoute
          path="/products/list"
          exact
          component={ProductListScreen}
        />
        <LayoutRoute path="/products/:id" exact component={ProductScreen} />

        {/* Authenticated user pages */}
        <PrivateLayoutRoute path="/profile" exact component={ProfileScreen} />

        {/* Guest-only pages */}
        <GuestLayoutRoute
          path="/register"
          exact
          component={RegistrationScreen}
        />
        <GuestLayoutRoute path="/login" exact component={LoginScreen} />

        {/* Pages with simplified layout */}
        <SimpleLayoutRoute path="/checkout" exact component={CheckoutScreen} />
        <SimpleLayoutRoute
          path="/success"
          exact
          component={OrderSuccessScreen}
        />

        {/* Fallback route for unknown URLs */}
        <LayoutRoute component={ErrorScreen} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
