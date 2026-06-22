import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";

import { Button } from "@mui/material";

import ProductCard from "../components/ProductCard";
import { CartContext } from "../components/CartContext";

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  gap: 50px;

  @media (max-width: 1200px) {
    flex-direction: column;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const LeftContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 650px;
  object-fit: cover;
  border-radius: 15px;
`;

const InfoContainer = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-weight: 700;
`;

const Price = styled.h2`
  color: #0d6efd;
  margin-top: 15px;
`;

const Desc = styled.p`
  line-height: 1.8;
`;

const buttonStyle = {
  width: "200px",
  height: "44px",
  borderRadius: "8px",
  fontWeight: 600,
};

function ProductScreen() {
  // Shopping cart functionality
  const { addToCart } = useContext(CartContext);

  // Product ID from URL
  const { id } = useParams();

  // Product being viewed
  const [product, setProduct] = useState(null);

  // All products used for recommendations
  const [allProducts, setAllProducts] = useState([]);

  // Selected quantity
  const [quantity, setQuantity] = useState(1);

  // Success message state
  const [added, setAdded] = useState(false);

  // Fetch all products for the related products section
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/products/list`)
      .then((res) => res.json())
      .then((products) => {
        setAllProducts(products);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Fetch the selected product
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/products/find/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, [id]);

  // Reset quantity and success message when viewing a new product
  useEffect(() => {
    setQuantity(1);
    setAdded(false);
  }, [id]);

  // Display loading message while product data is retrieved
  if (!product) {
    return (
      <div className="container py-5">
        <h2>Loading...</h2>
      </div>
    );
  }

  // Display products other than the current one
  const suggestedProducts = allProducts
    .filter((p) => p._id !== product._id)
    .slice(0, 4);

  // Return a colour value based on the product colour
  const getColourStyle = () => {
    const colour = product.color?.toLowerCase().trim();

    const colours = {
      green: "#c7d69a", // vase
      white: "#f8f8f4", // tote bag
      gold: "#d4af37", // earrings & bracelet
      cream: "#f4ecd8", // candle
    };

    return colours[colour] || "#cccccc";
  };

  return (
    <div className="bg-light">
      {/* PRODUCT DETAILS */}
      <Wrapper>
        <LeftContainer>
          {/* PRODUCT IMAGE */}
          <div>
            <Image src={product.productImage} alt={product.productName} />

            <div
              className="d-flex gap-2 mt-3"
              style={{
                justifyContent: "center",
              }}
            >
              <img
                src={product.productImage}
                alt=""
                style={{
                  width: "90px",
                  height: "90px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  border: "2px solid #0d6efd",
                  opacity: 0.8,
                }}
              />

              <img
                src={product.productImage}
                alt=""
                style={{
                  width: "90px",
                  height: "90px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  opacity: 0.8,
                }}
              />

              <img
                src={product.productImage}
                alt=""
                style={{
                  width: "90px",
                  height: "90px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  opacity: 0.8,
                }}
              />
            </div>
          </div>
        </LeftContainer>

        {/* PRODUCT INFORMATION */}
        <InfoContainer>
          <Title>{product.productName}</Title>

          <Price>£{product.price}</Price>

          <div className="mb-3 mt-3">
            <span
              style={{
                color: "green",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              ✓ In Stock
            </span>
          </div>

          <Desc>{product.productDesc}</Desc>

          <div
            className="card p-3 mb-4"
            style={{
              borderRadius: "10px",
            }}
          >
            <h5 className="mb-4">Product Information</h5>

            <p>
              <strong>Category:</strong> {product.category}
            </p>

            <div className="d-flex align-items-center mb-3">
              <strong className="me-2">Colour:</strong>

              {product.color === "Multicoloured" ? (
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(45deg, #ff8a8a, #ffc1cc, #b39ddb, #80cbc4)",
                    border: "1px solid #ccc",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: getColourStyle(),
                    border: "1px solid #ccc",
                  }}
                />
              )}
            </div>

            <p>
              <strong>SKU:</strong> {product.sku}
            </p>

            <p className="mb-0">
              <strong>Handmade:</strong> Yes
            </p>
          </div>

          {/* DELIVERY INFORMATION */}
          <div
            className="card p-3 mb-4"
            style={{
              borderRadius: "10px",
            }}
          >
            <h5 className="mb-3">Delivery Information</h5>

            <p className="mb-2">
              🚚 Standard delivery within 3–5 working days.
            </p>

            <p className="mb-2">📦 Securely packaged for safe delivery.</p>

            <p className="mb-0">
              ❤️ Every order helps support our charitable projects.
            </p>
          </div>

          {/* QUANTITY SELECTOR */}
          <div className="mb-4 text-center">
            <label className="fw-bold mb-3 d-block">Quantity</label>

            <div className="d-flex align-items-center justify-content-center gap-2">
              <Button
                variant="outlined"
                sx={{
                  minWidth: "40px",
                  borderRadius: "8px",
                  fontWeight: 600,
                }}
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
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
                {quantity}
              </div>

              <Button
                variant="outlined"
                sx={{
                  minWidth: "40px",
                  borderRadius: "8px",
                  fontWeight: 600,
                }}
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="d-flex justify-content-center gap-3 flex-wrap mt-4">
            <Button
              variant="contained"
              sx={{
                ...buttonStyle,
              }}
              onClick={() => {
                addToCart(product, quantity);

                setAdded(true);

                setTimeout(() => {
                  setAdded(false);
                }, 3000);
              }}
            >
              Add To Cart
            </Button>

            <Button
              component={Link}
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

          {/* ADD TO CART CONFIRMATION */}
          {added && (
            <div
              className="mt-4"
              style={{
                backgroundColor: "#d1e7dd",
                color: "#0f5132",
                padding: "12px",
                borderRadius: "8px",
                borderLeft: "5px solid #198754",
                maxWidth: "450px",
                margin: "0 auto",
              }}
            >
              <strong>✓ Added To Cart</strong>

              <p className="mb-0 mt-2">
                {quantity} item{quantity > 1 ? "s" : ""} added to your shopping
                cart.
              </p>
            </div>
          )}
        </InfoContainer>
      </Wrapper>

      {/* RELATED PRODUCTS */}
      <div
        style={{
          padding: "0 50px 50px",
        }}
      >
        <div className="text-center mt-5 mb-4">
          <h6
            style={{
              color: "#0d6efd",
              fontWeight: 600,
              letterSpacing: "1px",
            }}
          >
            EXPLORE MORE
          </h6>

          <h2 className="fw-bold">Related Products</h2>
          <p className="text-muted">
            Discover more handcrafted products from our collection.
          </p>
        </div>

        <div className="d-flex flex-wrap gap-3 align-center">
          {suggestedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductScreen;
