import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  CircularProgress,
  FormControl,
  Button,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function RegistrationScreen() {
  // Component state
  const [formState, setFormState] = useState(null);
  const [errorsState, setErrorsState] = useState([]);
  const [files, setFiles] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  // References to form input fields
  var firstNameField;
  var lastNameField;
  var emailField;
  var passwordField;
  var phoneField;

  // Validate form data and create a new account
  function register() {
    // Create FormData for the registration request
    const formData = new FormData();

    // Append uploaded profile image
    files.forEach((fileAttachment, index) => {
      formData.append(index, fileAttachment);
    });

    // Validate required fields
    const errors = [];

    if (firstNameField.value.length === 0) {
      errors.push("Please enter your first name.");
    }

    if (lastNameField.value.length === 0) {
      errors.push("Please enter your last name.");
    }

    if (emailField.value.length === 0) {
      errors.push("Please enter a valid email address.");
    }

    if (phoneField.value.length === 0) {
      errors.push("Please enter a valid phone number.");
    }

    if (passwordField.value.length === 0) {
      errors.push("Please enter your password.");
    }

    if (!emailField.value.includes("@")) {
      errors.push("Please enter a valid email address.");
    }

    if (phoneField.value.trim().length < 10) {
      errors.push("Please enter a valid phone number.");
    }

    // Display client-side validation errors
    if (errors.length > 0) {
      setFormState("client error");
      setErrorsState(errors);
    }
    // Submit registration data to backend
    else {
      // Show loading indicator while request is processing
      setFormState("loading");
      setErrorsState([]);

      // Append form values to FormData
      formData.append("firstName", firstNameField.value);
      formData.append("lastName", lastNameField.value);
      formData.append("email", emailField.value);
      formData.append("password", passwordField.value);
      formData.append("phone", phoneField.value);

      // Send registration request to backend
      fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/users/register`, {
        method: "POST",
        body: formData,
      })
        .then(function (backendResponse) {
          // Convert the HTTP string response to JSON
          return backendResponse.json();
        })
        .then(function (jsonResponse) {
          // Registration completed successfully
          if (jsonResponse.status === "ok") {
            setFormState("success");
          } else {
            setFormState("backend error");
            setErrorsState([jsonResponse.message]);
          }
        })
        // If the backend returns an error, show the error state
        .catch(function () {
          setFormState("backend error");
          setErrorsState(["Unable to register. Please try again later."]);
        });
    }
  }

  // Render validation messages as list items
  function addListItem(str, index) {
    return <li key={index}>{str}</li>;
  }

  // Store selected profile image
  function attachFile(evt) {
    setFiles(Array.from(evt.target.files));
  }

  return (
    <div className="container py-5">
      {/* PAGE HEADER */}
      <div className="text-center mb-5">
        <h6
          style={{
            color: "#0d6efd",
            fontWeight: 600,
            letterSpacing: "1px",
          }}
        >
          CREATE ACCOUNT
        </h6>

        <h1 className="fw-bold">Join Benevolent Hearts</h1>

        <p className="lead text-muted">
          Create an account to donate items, volunteer and manage your bookings.
        </p>
      </div>

      {/* REGISTRATION FORM */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          borderRadius: "16px",
          padding: "40px",
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        <div
          className="text-center mb-4"
          style={{
            backgroundColor: "#fff3cd",
            color: "#664d03",
            padding: "12px",
            borderRadius: "8px",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          Please complete all required fields to create your account.
        </div>

        {/* ACCOUNT DETAILS */}
        <Box mb={2}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <TextField
              label="First Name"
              inputRef={(el) => {
                firstNameField = el;
              }}
              required
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <TextField
              label="Last Name"
              inputRef={(el) => {
                lastNameField = el;
              }}
              required
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <TextField
              label="Email Address"
              type="email"
              inputRef={(el) => {
                emailField = el;
              }}
              required
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <TextField
              label="Phone Number"
              inputRef={(el) => {
                phoneField = el;
              }}
              required
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              inputRef={(el) => {
                passwordField = el;
              }}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </Box>

        {/* PROFILE IMAGE UPLOAD */}
        <div
          className="p-3 mb-4"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            border: "1px solid #dee2e6",
          }}
        >
          <h6 className="fw-bold mb-2">Profile Picture (Optional)</h6>

          <p className="text-muted mb-3">
            Upload a profile photo to personalise your account.
          </p>

          <Button
            variant="outlined"
            component="label"
            sx={{
              borderRadius: "8px",
              fontWeight: 600,
            }}
          >
            Upload Image
            <input hidden accept="image/*" type="file" onChange={attachFile} />
          </Button>
        </div>

        {/* SUBMIT BUTTON / SUCCESS BUTTON */}
        <div className="text-center">
          {formState === "loading" ? (
            <CircularProgress />
          ) : formState === "success" ? (
            <Button
              component={Link}
              to="/login"
              variant="contained"
              sx={{
                width: "220px",
                height: "44px",
                borderRadius: "8px",
                fontWeight: 600,
                color: "#fff",

                "&:hover": {
                  color: "#fff",
                },
              }}
            >
              Continue to Login
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={register}
              sx={{
                width: "200px",
                height: "44px",
                borderRadius: "8px",
                fontWeight: 600,
                color: "#fff",

                "&:hover": {
                  color: "#fff",
                },
              }}
            >
              Create Account
            </Button>
          )}
        </div>

        {/* VALIDATION AND SUCCESS MESSAGES */}
        <Box mt={4}>
          {(formState === "client error" || formState === "backend error") && (
            <div
              className="mt-4"
              style={{
                backgroundColor: "#f8d7da",
                color: "#842029",
                padding: "12px",
                borderRadius: "8px",
                borderLeft: "5px solid #dc3545",
              }}
            >
              <ul className="mb-0">{errorsState.map(addListItem)}</ul>
            </div>
          )}

          {formState === "success" && (
            <div className="text-center">
              <div
                className="mt-4"
                style={{
                  backgroundColor: "#d1e7dd",
                  color: "#0f5132",
                  padding: "12px",
                  borderRadius: "8px",
                  borderLeft: "5px solid #198754",
                }}
              >
                <strong>✓ Registration Successful</strong>

                <p className="mb-0 mt-2">
                  Your account has been created successfully. You can now sign
                  in and start donating items, volunteering, and managing your
                  bookings.
                </p>
              </div>
            </div>
          )}
        </Box>
      </div>
    </div>
  );
}

export default RegistrationScreen;
