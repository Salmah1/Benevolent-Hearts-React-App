import { useState, useEffect } from "react";
import styled from "styled-components";

import ProductCard from "../components/ProductCard";

// Styled components
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;

const ProductListScreen = () => {
  // Products retrieved from the backend
  const [products, setProducts] = useState([]);

  // Current sort option selected by the user
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/products/list`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Products:", data);
        setProducts(data);
      })
      .catch(() => {
        alert("Unable to load products. Please try again.");
      });
  }, []);

  // Create a copy before sorting
  const sortedProducts = [...products];

  // Sort by price (lowest first)
  if (sortOption === "low") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  // Sort by price (highest first)
  if (sortOption === "high") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  // Sort alphabetically A-Z
  if (sortOption === "az") {
    sortedProducts.sort((a, b) => a.productName.localeCompare(b.productName));
  }

  // Sort alphabetically Z-A
  if (sortOption === "za") {
    sortedProducts.sort((a, b) => b.productName.localeCompare(a.productName));
  }

  return (
    <div className="bg-light">
      <div className="container py-5">
        {/* PAGE HEADER */}
        <div className="text-center mb-3">
          <h6
            style={{
              color: "#0d6efd",
              fontWeight: 600,
              letterSpacing: "1px",
            }}
          >
            SHOP
          </h6>

          <h1 className="fw-bold">Handcrafted Products</h1>

          <p
            className="text-muted"
            style={{
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Browse our collection of handcrafted products. Every purchase helps
            support community initiatives and charitable projects.
          </p>
        </div>

        {/* PRODUCT COUNT & SORT OPTIONS */}
        <div
          className="d-flex justify-content-between align-items-center flex-wrap mb-3"
          style={{
            backgroundColor: "#f8f9fa",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <div>
            <strong>{sortedProducts.length}</strong> products available
          </div>

          <div>
            <FilterText>Sort By:</FilterText>

            <Select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              style={{
                borderRadius: "8px",
                border: "1px solid #dee2e6",
              }}
            >
              <option value="">Featured Products</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="az">Name: A to Z</option>
              <option value="za">Name: Z to A</option>
            </Select>
          </div>
        </div>

        {/* PRODUCT LIST */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          {sortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListScreen;
