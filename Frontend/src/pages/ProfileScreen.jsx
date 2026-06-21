import { useEffect, useContext, useState } from "react";
import { UserContext } from "../components/UserContext";
import {
  CircularProgress,
  Box,
  TextField,
  Avatar,
  Button,
  Checkbox,
  IconButton,
  InputAdornment,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function ProfileScreen() {
  // User profile data retrieved from backend
  const [userDetails, setUserDetails] = useState();

  // Preview selected avatar before upload
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Form status: loading, success, client error, backend error
  const [formState, setFormState] = useState(null);

  // Validation/backend error messages
  const [errorsState, setErrorsState] = useState([]);

  // Controls password update field visibility
  const [changePassword, setChangePassword] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const { jsonwebtoken, updateUser } = useContext(UserContext);

  var firstNameField;
  var lastNameField;
  var emailField;
  var avatarField;
  var passwordField;
  var phoneField;

  // Load current user's profile when component mounts
  useEffect(
    function () {
      fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/users/find`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jsonwebtoken")}`,
        },
      })
        // This will receive string data and convert to json
        .then(function (backendResponse) {
          return backendResponse.json();
        })
        // This will receive the converted json
        .then(function (jsonResponse) {
          setUserDetails(jsonResponse);
          updateUser({
            jsonwebtoken,
            ...jsonResponse,
          });
        })
        // This will catch errors if any
        .catch(function () {
          setFormState("backend error");
        });
    },

    [jsonwebtoken, updateUser],
  );

  // Display selected image before uploading
  function attachFile(evt) {
    const file = evt.target.files[0];

    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  }

  // Enable or disable password update field
  function togglePasswordChange(event) {
    setChangePassword(event.currentTarget.checked);
  }

  // Validate form and send profile updates to backend
  function update() {
    // Validate the fields
    const errors = [];

    const formData = new FormData();

    if (changePassword && passwordField.value.trim().length === 0) {
      errors.push("Please enter your password");
    }

    if (firstNameField.value.trim().length === 0) {
      errors.push("Please enter your first name");
    }

    if (lastNameField.value.trim().length === 0) {
      errors.push("Please enter your last name");
    }

    if (phoneField.value.trim().length === 0) {
      errors.push("Please enter your phone number");
    }

    if (emailField.value.trim().length === 0) {
      errors.push("Please enter your email");
    }

    // If any field is not validated, go to "client error"
    if (errors.length > 0) {
      setFormState("client error");
      setErrorsState(errors);
      return;
    }

    setFormState("loading");
    setErrorsState([]);

    // Send data backend
    formData.append("firstName", firstNameField.value);
    formData.append("lastName", lastNameField.value);
    formData.append("email", emailField.value);
    formData.append("phone", phoneField.value);
    if (avatarField.files[0]) {
      formData.append("avatar", avatarField.files[0]);
    }
    if (changePassword) {
      formData.append("password", passwordField.value);
    }

    fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/users/update`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jsonwebtoken")}`,
      },
      body: formData,
    })
      .then(function (backendResponse) {
        return backendResponse.json();
      })

      .then(function (jsonResponse) {
        if (jsonResponse) {
          setUserDetails(jsonResponse);

          updateUser({
            jsonwebtoken,
            ...jsonResponse,
          });

          setFormState("success");
        } else {
          setFormState("backend error");
        }
      })
      .catch(function () {
        setFormState("backend error");
      });
  }

  const addListItem = (str, index) => <li key={index}>{str}</li>;

  if (!userDetails) {
    return (
      <div className="text-center py-5">
        <CircularProgress />
      </div>
    );
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
          MY PROFILE
        </h6>

        <h1 className="fw-bold">Manage Your Account</h1>

        <p className="lead text-muted">
          Update your personal information, contact details and profile picture.
        </p>
      </div>

      <div
        style={{
          backgroundColor: "#f8f9fa",
          borderRadius: "16px",
          padding: "40px",
          maxWidth: "900px",
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
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Update your details below and save your changes when finished.
        </div>

        {/* PROFILE IMAGE */}
        <div className="text-center mb-5">
          <Avatar
            src={avatarPreview || userDetails.avatar}
            sx={{
              width: 180,
              height: 180,
              margin: "0 auto 20px auto",
            }}
          />

          <Button
            variant="outlined"
            component="label"
            sx={{
              borderRadius: "8px",
              fontWeight: 600,
            }}
          >
            Upload New Photo
            <input
              hidden
              ref={(thisElement) => {
                avatarField = thisElement;
              }}
              onChange={attachFile}
              accept="image/*"
              type="file"
            />
          </Button>
        </div>

        {/* ACCOUNT DETAILS */}
        <Box mb={2}>
          <TextField
            fullWidth
            sx={{ mb: 3 }}
            label="First Name"
            defaultValue={userDetails.firstName}
            inputRef={(thisElement) => {
              firstNameField = thisElement;
            }}
          />

          <TextField
            fullWidth
            sx={{ mb: 3 }}
            label="Last Name"
            defaultValue={userDetails.lastName}
            inputRef={(thisElement) => {
              lastNameField = thisElement;
            }}
          />

          <TextField
            fullWidth
            sx={{ mb: 3 }}
            label="Phone Number"
            defaultValue={userDetails.phone}
            inputRef={(thisElement) => {
              phoneField = thisElement;
            }}
          />

          <TextField
            fullWidth
            sx={{ mb: 3 }}
            label="Email Address"
            defaultValue={userDetails.email}
            inputRef={(thisElement) => {
              emailField = thisElement;
            }}
          />
        </Box>

        {/* PASSWORD SECTION */}
        <div
          className="p-3 mb-4"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            border: "1px solid #dee2e6",
          }}
        >
          <div className="d-flex align-items-center mb-3">
            <Checkbox
              checked={changePassword}
              onChange={togglePasswordChange}
            />

            <span className="fw-semibold">Change Password</span>
          </div>

          <TextField
            fullWidth
            disabled={!changePassword}
            type={showPassword ? "text" : "password"}
            label="New Password"
            inputRef={(thisElement) => {
              passwordField = thisElement;
            }}
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
        </div>

        {/* SAVE BUTTON */}
        <div className="text-center">
          {formState !== "loading" && (
            <Button
              variant="contained"
              onClick={update}
              sx={{
                width: "200px",
                height: "44px",
                borderRadius: "8px",
                fontWeight: 600,
              }}
            >
              Save Changes
            </Button>
          )}

          {formState === "loading" && <CircularProgress />}
        </div>

        {/* STATUS MESSAGES */}
        <Box mt={4}>
          {formState === "client error" && (
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

          {formState === "backend error" && (
            <div
              style={{
                backgroundColor: "#f8d7da",
                color: "#842029",
                padding: "12px",
                borderRadius: "8px",
                borderLeft: "5px solid #dc3545",
              }}
            >
              <strong>Unable to Update Profile</strong>

              <ul className="mb-0 mt-2">{errorsState.map(addListItem)}</ul>
            </div>
          )}

          {formState === "success" && (
            <div
              style={{
                backgroundColor: "#d1e7dd",
                color: "#0f5132",
                padding: "12px",
                borderRadius: "8px",
                borderLeft: "5px solid #198754",
              }}
            >
              <strong>✓ Profile Updated</strong>

              <p className="mb-0 mt-2">
                Your account information has been updated successfully.
              </p>
            </div>
          )}
        </Box>
      </div>
    </div>
  );
}

export default ProfileScreen;
