const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

const ProductModel = require("../models/ProductModel");

// products/add
router.post("/add", async function (req, res) {
  try {
    const newDocument = {
      sku: req.body.sku,
      productName: req.body.productName,
      productDesc: req.body.productDesc,
      productImage: req.body.productImage,
      price: req.body.price,
      category: req.body.category,
      color: req.body.color,
    };

    // Check if SKU already exists
    const existingProduct = await ProductModel.findOne({
      sku: newDocument.sku,
    });

    if (existingProduct) {
      return res.status(400).json({
        status: "not ok",
        message: "SKU already exists",
      });
    }

    // Upload image if included
    if (req.files && Object.values(req.files).length > 0) {
      const files = Object.values(req.files);

      const cloudinaryResult = await cloudinary.uploader.upload(files[0].path);

      newDocument.productImage = cloudinaryResult.url;
    }

    const createdDocument = await ProductModel.create(newDocument);

    res.json({
      status: "ok",
      createdDocument,
    });
  } catch (error) {
    res.status(500).json({
      status: "not ok",
      message: "Something went wrong with db",
    });
  }
});

// products/list
router.post("/list", function (req, res) {
  ProductModel.find(req.query)
    .then(function (dbDocument) {
      res.json(dbDocument);
    })
    .catch(function () {
      res.status(500).json({
        status: "not ok",
        message: "Something went wrong",
      });
    });
});

// products/update
router.put("/update", function (req, res) {
  let updates = {};

  if (req.body.productName) {
    updates.productName = req.body.productName;
  }

  if (req.body.productDesc) {
    updates.productDesc = req.body.productDesc;
  }

  if (req.body.productImage) {
    updates.productImage = req.body.productImage;
  }

  if (req.body.price) {
    updates.price = req.body.price;
  }

  if (req.body.category) {
    updates.category = req.body.category;
  }

  ProductModel.findOneAndUpdate(
    {
      sku: req.body.sku,
    },
    {
      $set: updates,
    },
    {
      new: true,
    },
  )
    .then(function (dbDocument) {
      res.json(dbDocument);
    })
    .catch(function () {
      res.status(500).json({
        status: "not ok",
        message: "Something went wrong",
      });
    });
});

// products/find/:id
router.get("/find/:id", function (req, res) {
  ProductModel.findById(req.params.id)
    .then(function (product) {
      res.json(product);
    })
    .catch(function () {
      res.status(500).json({
        status: "not ok",
        message: "Something went wrong",
      });
    });
});

module.exports = router;
