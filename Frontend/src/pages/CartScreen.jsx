import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";

import { Button, IconButton, Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { MDBCardImage, MDBCol, MDBRow, MDBTypography } from "mdb-react-ui-kit";

import { CartContext } from "../components/CartContext";
import { UserContext } from "../components/UserContext";

function Cart() {
  // Shopping cart functions and data
  const { cartItems, removeFromCart, updateQuantity, clearCart } =
    useContext(CartContext);

  // Logged-in user status
  const { loggedIn } = useContext(UserContext);

  // Calculate cart total
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const buttonStyle = {
    width: "200px",
    height: "44px",
    borderRadius: "8px",
    fontWeight: 600,
  };

  return (
    <div className="container mt-5 mb-5">
      <MDBRow className="justify-content-center">
        <MDBCol lg="8">
          {/* PAGE HEADER */}
          <div className="text-center mb-5">
            <h6
              style={{
                color: "#0d6efd",
                fontWeight: 600,
                letterSpacing: "1px",
              }}
            >
              SHOPPING CART
            </h6>

            <h1 className="fw-bold">Review Your Items</h1>

            <p className="lead text-muted">
              Every purchase helps support community projects and charitable
              initiatives.
            </p>
          </div>

          {/* EMPTY CART VIEW */}
          <div
            style={{
              backgroundColor: "#f8f9fa",
              borderRadius: "16px",
              padding: "40px",
            }}
          >
            {cartItems.length === 0 ? (
              <div
                className="text-center"
                style={{
                  padding: "20px 0",
                  maxWidth: "500px",
                  margin: "0 auto",
                }}
              >
                <div
                  style={{
                    fontSize: "80px",
                    marginBottom: "20px",
                  }}
                >
                  🛒
                </div>

                <h2 className="fw-bold mb-3">Your Cart Is Empty</h2>

                <p
                  className="text-muted mb-4"
                  style={{
                    fontSize: "18px",
                  }}
                >
                  Browse our handmade products and discover items that support
                  community projects and charitable initiatives.
                </p>

                <Button
                  component={RouterLink}
                  to="/products/list"
                  variant="contained"
                  sx={{
                    ...buttonStyle,
                    color: "#fff",

                    "&:hover": {
                      color: "#fff",
                    },
                  }}
                >
                  Start Shopping
                </Button>
              </div>
            ) : (
              <>
                {/* CART ITEMS */}
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="cart-item d-flex flex-column flex-md-row align-items-center mb-4 pb-4"
                    style={{
                      borderBottom: "1px solid #e9ecef",
                      padding: "15px",
                    }}
                  >
                    {/* PRODUCT IMAGE */}
                    <div className="flex-shrink-0">
                      <RouterLink
                        to={`/products/${item._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <MDBCardImage
                          src={item.productImage}
                          alt={item.productName}
                          style={{
                            width: "130px",
                            height: "130px",
                            objectFit: "cover",
                            borderRadius: "12px",
                          }}
                        />
                      </RouterLink>
                    </div>

                    {/* PRODUCT DETAILS */}
                    <div
                      className="ms-4"
                      style={{
                        flex: 1,
                      }}
                    >
                      <MDBTypography
                        tag="h5"
                        className="mb-2"
                        style={{
                          fontWeight: 600,
                        }}
                      >
                        <RouterLink
                          to={`/products/${item._id}`}
                          style={{
                            textDecoration: "none",
                            color: "#0d6efd",
                          }}
                        >
                          {item.productName}
                        </RouterLink>
                      </MDBTypography>

                      <div className="mb-2">
                        <Chip
                          label={item.category}
                          size="small"
                          sx={{
                            mr: 1,
                            backgroundColor: "#f1f5f9",
                          }}
                        />

                        <Chip label="Handmade" color="success" size="small" />
                      </div>

                      <div className="d-flex align-items-center gap-4 flex-wrap">
                        <p
                          className="fw-bold mb-0"
                          style={{
                            minWidth: "60px",
                          }}
                        >
                          £{item.price}
                        </p>
                        <div
                          className="d-flex align-items-center gap-2"
                          style={{
                            minWidth: "150px",
                          }}
                        >
                          <Button
                            size="small"
                            variant="outlined"
                            sx={{
                              minWidth: "36px",
                              height: "32px",
                            }}
                            onClick={() =>
                              item.quantity > 1 &&
                              updateQuantity(item._id, item.quantity - 1)
                            }
                          >
                            -
                          </Button>
                          <div
                            className="border rounded d-flex align-items-center justify-content-center"
                            style={{
                              width: "50px",
                              height: "32px",
                              fontWeight: "bold",
                            }}
                          >
                            {item.quantity}
                          </div>
                          <Button
                            size="small"
                            variant="outlined"
                            sx={{
                              minWidth: "36px",
                              height: "32px",
                            }}
                            onClick={() =>
                              updateQuantity(item._id, item.quantity + 1)
                            }
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* ITEM TOTAL AND REMOVE BUTTON */}
                    <div
                      className="d-flex align-items-center mt-3"
                      style={{
                        gap: "16px",
                        marginLeft: "24px",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          fontSize: "18px",
                          fontWeight: "700",
                          color: "#0d6efd",
                          backgroundColor: "#e8f4ff",
                          padding: "6px 12px",
                          borderRadius: "8px",
                        }}
                      >
                        £{(item.price * item.quantity).toFixed(2)}
                      </div>

                      <IconButton onClick={() => removeFromCart(item._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </div>
                ))}

                {/* COMMUNITY IMPACT MESSAGE */}
                <div
                  className="mb-4"
                  style={{
                    backgroundColor: "#d1e7dd",
                    color: "#0f5132",
                    padding: "12px",
                    borderRadius: "8px",
                    borderLeft: "5px solid #198754",
                  }}
                >
                  <strong>✓ Supporting Communities</strong>

                  <p className="mb-0 mt-2">
                    Every purchase contributes towards Benevolent Hearts
                    community projects, fundraising activities and charitable
                    support services.
                  </p>
                </div>

                {/* ORDER TOTAL */}
                <div
                  className="d-flex justify-content-between p-4 mt-4 mb-4"
                  style={{
                    backgroundColor: "#e8f4ff",
                    borderRadius: "12px",
                    border: "1px solid #cfe2ff",
                  }}
                >
                  <MDBTypography tag="h5" className="fw-bold mb-0">
                    Total
                  </MDBTypography>

                  <h4
                    className="fw-bold mb-0"
                    style={{
                      color: "#0d6efd",
                    }}
                  >
                    £{total.toFixed(2)}
                  </h4>
                </div>

                {/* CHECKOUT BUTTON */}
                <div className="d-flex justify-content-center mt-4">
                  <Button
                    component={RouterLink}
                    to={loggedIn ? "/checkout" : "/login"}
                    variant="contained"
                    sx={{
                      width: "230px",
                      height: "44px",
                      borderRadius: "8px",
                      fontWeight: 600,
                      color: "#fff",

                      "&:hover": {
                        color: "#fff",
                      },
                    }}
                  >
                    Proceed To Payment
                  </Button>
                </div>

                <div className="d-flex justify-content-center gap-3 flex-wrap mt-3">
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={clearCart}
                    sx={{
                      ...buttonStyle,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Clear Cart
                  </Button>

                  <Button
                    component={RouterLink}
                    to="/products/list"
                    variant="outlined"
                    sx={{
                      ...buttonStyle,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </>
            )}
          </div>
        </MDBCol>
      </MDBRow>
    </div>
  );
}

export default Cart;
