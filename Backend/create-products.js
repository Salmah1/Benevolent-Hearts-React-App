require("dotenv").config();

const mongoose = require("mongoose");
const ProductModel = require("./models/ProductModel");

mongoose.connect(process.env.DB_URL);

ProductModel.create([
  {
    sku: "P001",
    productName: "Ceramic Vases",
    productDesc:
      "Two handcrafted ceramic vase created by local artisans and volunteers. Perfect for displaying dried flowers or adding a minimalist touch to your home. Every purchase helps support community projects and charitable initiatives.",
    productImage: "/img/ceramic-vase.jpg",
    price: 12.99,
    category: "Home Decor",
    color: "Green",
  },
  {
    sku: "P002",
    productName: "Tote Bag",
    productDesc:
      "An eco-friendly reusable tote bag featuring unique hand-painted designs. Practical for shopping, work, or everyday use while supporting a good cause.",
    productImage: "/img/tote-bag.jpg",
    price: 8.99,
    category: "Accessories",
    color: "White",
  },
  {
    sku: "P003",
    productName: "Set of 5 Ceramic Mugs",
    productDesc:
      "A collection of handcrafted ceramic mugs made by local artisans. Perfect for tea, coffee, and gifting while supporting community projects.",
    productImage: "/img/mugs.jpg",
    price: 15,
    category: "Kitchenware",
    color: "Multicoloured",
  },
  {
    sku: "P004",
    productName: "Citrus Scented Candle Set",
    productDesc:
      "Hand-poured scented candles with refreshing citrus notes. Made using natural wax and designed to create a calming atmosphere.",
    productImage: "/img/candle.jpg",
    price: 6,
    category: "Home Decor",
    color: "Cream",
  },
  {
    sku: "P005",
    productName: "Knitted Scarf",
    productDesc:
      "A soft handcrafted knitted scarf made with care by community volunteers. Warm, comfortable, and perfect for colder weather.",
    productImage: "/img/scarf.jpg",
    price: 12,
    category: "Clothing",
    color: "Multicoloured",
  },
  {
    sku: "P006",
    productName: "Floral Earrings",
    productDesc:
      "Elegant handmade floral earrings designed to add a unique touch to any outfit. Lightweight and suitable for everyday wear.",
    productImage: "/img/earrings.jpg",
    price: 12,
    category: "Jewellery",
    color: "Gold",
  },
  {
    sku: "P007",
    productName: "Set of 3 Notebooks",
    productDesc:
      "Eco-friendly notebooks made from recycled floral paper. Ideal for journaling, note-taking, and creative projects.",
    productImage: "/img/notebooks.jpg",
    price: 12,
    category: "Stationery",
    color: "Multicoloured",
  },
  {
    sku: "P008",
    productName: "Flower Bracelet",
    productDesc:
      "A delicate handmade bracelet featuring floral-inspired beads and gold-plated details. A thoughtful gift or everyday accessory.",
    productImage: "/img/bracelet.jpg",
    price: 12,
    category: "Jewellery",
    color: "Gold",
  },
])
  .then(() => {
    process.exit();
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
