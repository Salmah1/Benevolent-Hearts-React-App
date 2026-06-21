const express = require("express");
const router = express.Router();

/**
 * ------------------------------------------------------------------------------
 * START
 * PassportJS Integration
 */
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

// This is similar to salt in bcrypt
const jwtSecret = process.env.JWT_SECRET;
/**
 * ------------------------------------------------------------------------------
 * END
 * PassportJS Integration
 */

const UserModel = require("../models/UserModel.js");
const passport = require("passport");

// http://localhost:3001/users/register
router.post("/register", function (req, res) {
  const formData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    avatar: req.body.avatar,
  };

  // Check if email is unique
  UserModel.findOne({ email: formData["email"] })
    .then(async function (dbDocument) {
      // If avatar file is included...
      if (req.files && Object.values(req.files).length > 0) {
        const files = Object.values(req.files);

        try {
          const cloudinaryResult = await cloudinary.uploader.upload(
            files[0].path,
          );

          formData.avatar = cloudinaryResult.url;
        } catch (error) {
          return res.status(500).json({
            status: "not ok",
            message: "Error occurred during image upload",
          });
        }
      }

      // If email is unique
      if (!dbDocument) {
        bcryptjs.genSalt(function (bcryptError, theSalt) {
          // Use the (a) and (b) salt user's password
          // and produce hashed password
          bcryptjs.hash(
            formData.password,
            theSalt,
            function (hashError, theHash) {
              // the hash
              // Reassign the original password formData
              formData["password"] = theHash;

              // Create the user's account with hashed password
              UserModel.create(formData)
                .then(function (createdDocument) {
                  res.json({
                    status: "ok",
                    createdDocument,
                  });
                })
                .catch(function (dbError) {
                  // For the client (frontend app)
                  res.status(503).json({
                    status: "not ok",
                    message: "Something went wrong with db",
                  });
                });
            },
          );
        });
      }
      // If email is NOT unique....
      else {
        // reject the request
        res.status(403).json({
          status: "not ok",
          message: "Account already exists",
        });
      }
    })
    .catch(function (dbError) {
      // For the client (frontend app)
      res.status(503).json({
        status: "not ok",
        message: "Something went wrong with db",
      });
    });
});

// http://localhost:3001/users/login
router.post("/login", (req, res) => {
  // Capture form data
  const formData = {
    email: req.body.email,
    password: req.body.password,
  };

  // Check if email exists
  UserModel.findOne({ email: formData.email })
    .then((dbDocument) => {
      // If email exists
      if (dbDocument) {
        // Compare the password sent againt password in database
        bcryptjs
          .compare(
            formData.password, // password user sent
            dbDocument.password, // password in database
          )
          .then((isMatch) => {
            if (isMatch) {
              const payload = {
                _id: dbDocument._id,
                email: dbDocument.email,
              };
              // Generate the jsonwebtoken
              jwt.sign(payload, jwtSecret, (error, jsonwebtoken) => {
                if (error) {
                  res.status(501).json({
                    message: "Something went wrong",
                  });
                } else {
                  res.json({
                    status: "ok",
                    message: {
                      email: dbDocument.email,
                      avatar: dbDocument.avatar,
                      firstName: dbDocument.firstName,
                      lastName: dbDocument.lastName,
                      jsonwebtoken: jsonwebtoken,
                    },
                  });
                }
              });
            }
            // If passwords don't match, reject login
            else {
              res.status(401).json({
                message: "Wrong email or password",
              });
            }
          })
          .catch((error) => {
            console.error(error);

            res.status(500).json({
              message: "Something went wrong",
            });
          });
      }
      // If email does not exist
      else {
        // reject the login
        res.status(401).json({
          message: "Wrong email or password",
        });
      }
    })
    .catch((error) => {
      res.status(503).json({
        status: "not ok",
        message: "Please try again later",
      });
    });
});

// http://localhost:3001/users/find
router.post(
  "/find",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    UserModel.findById(req.user.id)
      .then(function (dbDocument) {
        res.json(dbDocument);
      })
      .catch(function (error) {
        console.error(error);

        res.status(500).json({
          status: "not ok",
          message: "Something went wrong",
        });
      });
  },
);

// http://localhost:3001/users/update
router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  async function (req, res) {
    try {
      let updates = {};

      if (req.body.firstName) updates.firstName = req.body.firstName;
      if (req.body.lastName) updates.lastName = req.body.lastName;
      if (req.body.phone) updates.phone = req.body.phone;
      if (req.body.address) updates.address = req.body.address;
      if (req.body.email) updates.email = req.body.email;

      if (req.body.password) {
        updates.password = await bcryptjs.hash(req.body.password, 10);
      }

      if (req.files && Object.values(req.files).length > 0) {
        const files = Object.values(req.files);

        const cloudinaryResult = await cloudinary.uploader.upload(
          files[0].path,
        );

        updates.avatar = cloudinaryResult.url;
      }

      const dbDocument = await UserModel.findByIdAndUpdate(
        req.user._id,
        {
          $set: updates,
        },
        {
          new: true,
        },
      );

      res.json(dbDocument);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        status: "not ok",
        message: "Something went wrong",
      });
    }
  },
);

module.exports = router;
