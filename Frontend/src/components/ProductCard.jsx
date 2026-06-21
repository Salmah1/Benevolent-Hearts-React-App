import React from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Chip,
  Box,
} from "@mui/material";

import { CartContext } from "./CartContext";

function ProductCard({ product }) {
  const { addToCart } = React.useContext(CartContext);

  // Prevent rendering if product data is unavailable
  if (!product) return null;

  return (
    <Card
      sx={{
        width: 300,
        minHeight: 430,
        borderRadius: "16px",
        overflow: "hidden",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",

        "& .description": {
          maxHeight: 0,
          opacity: 0,
          overflow: "hidden",
          transition: "all 0.3s ease",
        },

        "&:hover": {
          transform: "translateY(-8px) scale(1.03)",
          boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
        },

        "&:hover .description": {
          maxHeight: "300px",
          opacity: 1,
          marginTop: "12px",
        },

        "&:hover .product-image": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Box
        sx={{
          overflow: "hidden",
        }}
      >
        <Box
          className="product-image"
          sx={{
            backgroundImage: `url(${product.productImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: "200px",
            width: "100%",
            transition: "transform 0.3s ease",
          }}
        />
      </Box>

      <CardContent>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            minHeight: "50px",
          }}
        >
          <Link
            to={`/products/${product._id}`}
            style={{
              textDecoration: "none",
              color: "#212529",
            }}
          >
            {product.productName}
          </Link>
        </Typography>

        <div className="mb-4">
          <Chip
            label={product.category}
            size="small"
            sx={{
              backgroundColor: "#f1f5f9",
              mr: 1,
            }}
          />

          <Chip label="Handmade" color="success" size="small" />
        </div>

        <Typography
          variant="h5"
          sx={{
            color: "#0d6efd",
            fontWeight: 700,
            mb: 1,
          }}
        >
          £{product.price}
        </Typography>

        <Box className="description">
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              lineHeight: 1.7,
            }}
          >
            {product.productDesc}
          </Typography>
        </Box>
      </CardContent>

      <CardActions
        sx={{
          px: 2,
          pb: 2,
          gap: 1,
          mt: "auto",
        }}
      >
        <Button
          component={Link}
          to={`/products/${product._id}`}
          variant="outlined"
          sx={{
            width: "110px",
            height: "44px",
            borderRadius: "8px",
            fontWeight: 600,
          }}
        >
          View
        </Button>

        <Button
          variant="contained"
          sx={{
            flex: 1,
            height: "44px",
            borderRadius: "8px",
            fontWeight: 600,
          }}
          // Add selected product to shopping cart
          onClick={() => addToCart(product)}
        >
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
