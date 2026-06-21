import React, { useState, useContext } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";

import { Button } from "@mui/material";
import { MDBInput } from "mdb-react-ui-kit";

import { CartContext } from "../components/CartContext";
import { UserContext } from "../components/UserContext";
import LocationTab from "../components/LocationTab";

function CheckoutScreen() {
  // Context data
  const { cartItems, clearCart, completePayment } = useContext(CartContext);

  const [locationComplete, setLocationComplete] = useState(false);

  const { loggedIn } = useContext(UserContext);

  const history = useHistory();

  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // Calculate cart total
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const cardPattern = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
  const expiryPattern = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
  const namePattern = /^[A-Za-z\s'-]{2,}$/;

  // Validate payment information and complete checkout
  const handlePayment = () => {
    if (!locationComplete) {
      alert("Please select a delivery location before continuing.");
      return;
    }

    const [month, year] = expiry.split("/");

    const expiryDate = new Date(Number(`20${year}`), Number(month));
    const currentDate = new Date();

    if (expiryDate <= currentDate) {
      alert("Card has expired");
      return;
    }

    if (!namePattern.test(name.trim())) {
      alert("Please enter a valid cardholder name.");
      return;
    }

    if (name.trim().split(" ").length < 2) {
      alert("Please enter first and last name.");
      return;
    }

    if (!cardPattern.test(cardNumber)) {
      alert("Please enter a valid 16-digit card number.");
      return;
    }

    if (!expiryPattern.test(expiry)) {
      alert("Please enter expiry in MM/YY format.");
      return;
    }

    if (!/^\d{3}$/.test(cvv)) {
      alert("Please enter a valid 3-digit CVV.");
      return;
    }

    completePayment();
    clearCart();
    history.push("/success");
  };

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    return <Redirect to="/cart" />;
  }

  // Redirect guests to login page
  if (!loggedIn) {
    return <Redirect to="/login" />;
  }

  const buttonStyle = {
    width: "200px",
    height: "44px",
    borderRadius: "8px",
    fontWeight: 600,
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h6
          style={{
            color: "#0d6efd",
            fontWeight: 600,
            letterSpacing: "1px",
          }}
        >
          SECURE CHECKOUT
        </h6>

        <h1 className="fw-bold">Complete Your Order</h1>

        <p className="lead text-muted">
          Every purchase helps support Benevolent Hearts community projects.
        </p>
      </div>

      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        {/* ORDER SUMMARY */}
        <div
          className="mb-5"
          style={{
            backgroundColor: "#f8f9fa",
            padding: "30px",
            borderRadius: "16px",
          }}
        >
          <h3 className="fw-bold mb-4 text-center">Order Summary</h3>

          {cartItems.map((item) => (
            <div
              key={item._id}
              className="d-flex justify-content-between align-items-start mb-4"
            >
              <div>
                <div className="fw-semibold">{item.productName}</div>

                <small className="text-muted">Qty: {item.quantity}</small>
              </div>

              <strong>£{(item.price * item.quantity).toFixed(2)}</strong>
            </div>
          ))}

          <hr />

          <div className="d-flex justify-content-between align-items-center">
            <h4 className="fw-bold mb-0">Total</h4>

            <h4
              className="fw-bold mb-0"
              style={{
                color: "#0d6efd",
              }}
            >
              £{total.toFixed(2)}
            </h4>
          </div>
        </div>
        {/* DELIVERY ADDRESS */}
        <div
          className="mb-5"
          style={{
            backgroundColor: "#f8f9fa",
            padding: "30px",
            borderRadius: "16px",
          }}
        >
          <h3 className="fw-bold mb-4 text-center">Delivery Address</h3>

          <LocationTab
            setLocationComplete={setLocationComplete}
            showHeading={false}
          />

          <div
            className="mt-4 p-3"
            style={{
              backgroundColor: "#e8f5e9",
              borderLeft: "5px solid #28a745",
              borderRadius: "8px",
            }}
          >
            <strong>🚚 Delivery Information</strong>

            <p className="mb-0 mt-2">
              Orders are typically delivered within 3–5 working days.
            </p>
          </div>
        </div>
        {/* PAYMENT DETAILS */}{" "}
        <div
          className="mb-5"
          style={{
            backgroundColor: "#f8f9fa",
            padding: "30px",
            borderRadius: "16px",
          }}
        >
          <h3 className="fw-bold mb-4 text-center">Payment Details</h3>

          <div className="mb-4">
            <p className="fw-bold mb-2">Cardholder Name</p>

            <MDBInput
              placeholder="John Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <p className="fw-bold mb-2">Card Number</p>

            <MDBInput
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");

                value = value.substring(0, 16);

                value = value.replace(/(\d{4})(?=\d)/g, "$1 ");

                setCardNumber(value);
              }}
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <p className="fw-bold mb-2">Expiry Date</p>

              <MDBInput
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, "");

                  if (value.length >= 3) {
                    value = value.substring(0, 2) + "/" + value.substring(2, 4);
                  }

                  setExpiry(value);
                }}
              />
            </div>

            <div className="col-md-6 mb-3">
              <p className="fw-bold mb-2">CVV</p>

              <MDBInput
                placeholder="123"
                maxLength={3}
                value={cvv}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setCvv(value.substring(0, 3));
                }}
              />
            </div>
          </div>

          <div
            className="mt-4 mb-4 p-3"
            style={{
              backgroundColor: "#e8f5e9",
              borderLeft: "5px solid #28a745",
              borderRadius: "8px",
            }}
          >
            <strong>🔒 Secure encrypted payment</strong>

            <p className="mb-0 mt-2">
              Your payment information is processed securely.
            </p>
          </div>

          <div className="d-flex justify-content-center gap-3 flex-wrap mt-4">
            <Button
              variant="contained"
              onClick={handlePayment}
              sx={{
                ...buttonStyle,
              }}
            >
              Complete Payment
            </Button>

            <Button
              component={Link}
              to="/cart"
              variant="outlined"
              sx={{
                ...buttonStyle,
              }}
            >
              Back To Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutScreen;
