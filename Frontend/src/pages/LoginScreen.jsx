import { useState, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import { UserContext } from "../components/UserContext";

import {
  Box,
  CircularProgress,
  FormControl,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function LoginScreen() {
  // Form state and validation errors
  const [formState, setFormState] = useState(null);
  const [errorsState, setErrorsState] = useState([]);

  const { updateUser } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);

  // Form input references
  let emailField;
  let passwordField;

  // Form data sent to the backend
  const formData = new FormData();

  // Validate credentials and authenticate user
  function login() {
    // Client-side validation
    const errors = [];

    if (emailField.value.length === 0) {
      errors.push("Please enter your email");
    }

    if (passwordField.value.length === 0) {
      errors.push("Please enter your password");
    }

    // If validation fails
    if (errors.length > 0) {
      setFormState("client error");
      setErrorsState(errors);
    }

    // If all fields are valid
    else {
      // Go to "loading"
      setFormState("loading");
      setErrorsState([]);

      // Add form data
      formData.append("email", emailField.value);
      formData.append("password", passwordField.value);

      // Send login request to backend
      fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/users/login`, {
        method: "POST",
        body: formData,
      })
        .then(function (backendResponse) {
          // Convert the HTTP string response to JSON
          if (!backendResponse.ok) {
            return backendResponse.json().then((err) => {
              throw err;
            });
          }

          return backendResponse.json();
        })
        .then(
          // If backend sends success, go to "success"
          function (jsonResponse) {
            if (jsonResponse.status === "ok") {
              setFormState("success");

              // Update the user context
              updateUser({
                email: jsonResponse.message.email,
                firstName: jsonResponse.message.firstName,
                lastName: jsonResponse.message.lastName,
                avatar: jsonResponse.message.avatar,
                jsonwebtoken: jsonResponse.message.jsonwebtoken,
                loggedIn: true,
              });
            } else {
              setFormState("backend error");
              setErrorsState([jsonResponse.message]);
            }
          },
        )
        .catch(function (backendError) {
          // If backends sends error, go to "backend error"
          setFormState("backend error");

          setErrorsState([backendError.message || "Wrong email or password"]);
        });
    }
  }

  function addListItem(str, index) {
    return <li key={index}>{str}</li>;
  }

  // Redirect after successful login
  if (formState === "success") {
    return <Redirect to="/" />;
  } else {
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
            SIGN IN
          </h6>

          <h1 className="fw-bold">Welcome Back</h1>

          <p className="lead text-muted">
            Sign in to manage donations, bookings and volunteer activities.
          </p>
        </div>

        {/* LOGIN FORM */}
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
            Please enter your account details to continue.
          </div>

          <Box mb={2}>
            {/* EMAIL FIELD */}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <TextField
                label="Email Address"
                inputRef={(thisElement) => {
                  emailField = thisElement;
                }}
                required
              />
            </FormControl>

            {/* PASSWORD FIELD */}
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
                        {showPassword ? <Visibility /> : <VisibilityOff />}{" "}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <div className="text-center">
              {/* REGISTER LINK */}
              <Link to="/register" className="register-link">
                Don't have an account? Create one
              </Link>
            </div>
          </Box>

          {/* SUBMIT BUTTON */}
          <div className="text-center mt-4">
            {formState === "loading" ? (
              <CircularProgress />
            ) : (
              <Button
                variant="contained"
                onClick={login}
                sx={{
                  width: "200px",
                  height: "44px",
                  borderRadius: "8px",
                  fontWeight: 600,
                }}
              >
                Sign In
              </Button>
            )}
          </div>

          {/* VALIDATION ERRORS */}
          <Box mt={4}>
            {(formState === "client error" ||
              formState === "backend error") && (
              <div
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
          </Box>
        </div>
      </div>
    );
  }
}

export default LoginScreen;
