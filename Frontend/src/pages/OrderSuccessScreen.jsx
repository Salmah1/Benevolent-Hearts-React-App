import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";

import { Button } from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

import { CartContext } from "../components/CartContext";

function OrderSuccessScreen() {
  // Access payment status from global cart context
  const { paymentComplete, resetPayment } = useContext(CartContext);

  // Generate a random order number when the page loads
  const orderNumber = React.useMemo(
    () => `BH-${Math.floor(100000 + Math.random() * 900000)}`,
    [],
  );

  const successBoxStyle = {
    backgroundColor: "#e8f5e9",
    borderLeft: "5px solid #28a745",
    borderRadius: "8px",
    textAlign: "left",
  };

  const buttonStyle = {
    width: "200px",
    height: "44px",
    borderRadius: "8px",
    fontWeight: 600,
  };

  // Prevent direct access if payment was not completed
  if (!paymentComplete) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container py-5">
      {/* ORDER CONFIRMATION CARD */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          borderRadius: "16px",
          padding: "50px",
          maxWidth: "750px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* PAGE HEADER */}
        <h6
          style={{
            color: "#0d6efd",
            fontWeight: 600,
            letterSpacing: "1px",
          }}
        >
          ORDER CONFIRMED
        </h6>

        {/* SUCCESS ICON */}
        <CheckCircleOutlinedIcon
          sx={{
            color: "#0d6efd",
            fontSize: 180,
          }}
        />

        <h2 className="fw-bold mt-3">Thank You For Your Purchase</h2>

        <p className="text-muted mt-3">
          Your payment was processed successfully and your order is now being
          prepared.
        </p>

        {/* ORDER NUMBER */}
        <div
          className="mx-auto mt-4 mb-4"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            padding: "12px",
            maxWidth: "300px",
            border: "1px solid #dee2e6",
          }}
        >
          <small className="text-muted d-block">Order Number</small>

          <strong
            style={{
              color: "#0d6efd",
              fontSize: "18px",
            }}
          >
            {orderNumber}
          </strong>
        </div>

        {/* ORDER CONFIRMATION MESSAGE */}
        <div className="mt-4 p-3" style={successBoxStyle}>
          <strong>✓ Order Placed Successfully</strong>

          <p className="mb-0 mt-2">
            Payment has been confirmed and your order has been recorded.
          </p>
        </div>

        {/* DELIVERY INFORMATION */}
        <div className="mt-4 p-3" style={successBoxStyle}>
          <strong>🚚 Delivery Information</strong>

          <p className="mb-0 mt-2">
            Your order will typically arrive within 3–5 working days.
          </p>
        </div>

        {/* CHARITY IMPACT MESSAGE */}
        <div className="mt-4 p-3" style={successBoxStyle}>
          <strong>❤️ Supporting Communities</strong>

          <p className="mb-0 mt-2">
            Every purchase helps support Benevolent Hearts community projects,
            fundraising activities and charitable initiatives.
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="d-flex justify-content-center gap-3 flex-wrap mt-5">
          <Button
            component={Link}
            to="/products/list"
            variant="contained"
            onClick={resetPayment}
            sx={{
              ...buttonStyle,
              color: "#fff",

              "&:hover": {
                color: "#fff",
              },
            }}
          >
            Continue Shopping
          </Button>

          <Button
            component={Link}
            to="/"
            variant="outlined"
            onClick={resetPayment}
            sx={{
              ...buttonStyle,
            }}
          >
            Back Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccessScreen;
