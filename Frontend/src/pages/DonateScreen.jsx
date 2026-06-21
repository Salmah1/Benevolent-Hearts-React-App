import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Link as RouterLink } from "react-router-dom";

import { Button } from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

import LocationTab from "../components/LocationTab";
import DateandTime from "../components/DateandTime";
import Dropdown from "../components/Dropdown";
import { UserContext } from "../components/UserContext";

function DonateScreen() {
  // Logged-in user information
  const { loggedIn } = React.useContext(UserContext);

  // Current active donation step
  const [activeTab, setActiveTab] = React.useState("category");

  // Validation status for each step
  const [completed, setCompleted] = React.useState({
    category: false,
    collection: false,
    location: false,
  });

  const [categoryComplete, setCategoryComplete] = React.useState(false);
  const [collectionComplete, setCollectionComplete] = React.useState(false);
  const [locationComplete, setLocationComplete] = React.useState(false);

  const buttonStyle = {
    width: "200px",
    height: "44px",
    borderRadius: "8px",
    fontWeight: 600,
  };

  // Users must be logged in before creating a donation booking
  if (!loggedIn) {
    return (
      <div className="container py-5">
        <div className="text-center mb-5">
          <h6
            style={{
              color: "#0d6efd",
              fontWeight: 600,
              letterSpacing: "1px",
            }}
          >
            DONATE ITEMS
          </h6>

          <h1 className="fw-bold">Schedule A Donation</h1>

          <p className="lead text-muted">
            Help support Benevolent Hearts by donating clothing, furniture and
            household items.
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#f8f9fa",
            borderRadius: "16px",
            padding: "50px",
            maxWidth: "700px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h3 className="fw-bold mb-3">Login Required</h3>

          <p className="text-muted mb-4">
            You need to be logged in before scheduling a donation collection.
          </p>

          <Button
            component={RouterLink}
            to="/login"
            variant="contained"
            sx={buttonStyle}
          >
            Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h6
          style={{
            color: "#0d6efd",
            fontWeight: 600,
            letterSpacing: "1px",
          }}
        >
          DONATE ITEMS
        </h6>

        <h1 className="fw-bold">Schedule A Donation</h1>

        <p className="lead text-muted">
          Help support Benevolent Hearts by donating clothing, furniture and
          household items.
        </p>
      </div>

      {/* CATEGORY STEP */}
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => {
          if (k === "category") setActiveTab(k);

          if (k === "collection" && completed.category) {
            setActiveTab(k);
          }

          if (k === "location" && completed.category && completed.collection) {
            setActiveTab(k);
          }

          if (
            k === "booking" &&
            completed.category &&
            completed.collection &&
            completed.location
          ) {
            setActiveTab(k);
          }
        }}
        className="mb-4"
        fill
      >
        <Tab
          eventKey="category"
          title={
            <span>
              {completed.category ? "✓ " : ""}
              Category
            </span>
          }
        >
          <div
            style={{
              backgroundColor: "#f8f9fa",
              borderRadius: "16px",
              padding: "40px",
              maxWidth: "900px",
              margin: "40px auto",
            }}
          >
            <h2 className="text-center mb-3">Select Donation Items</h2>

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
              Please select at least one donation category before continuing.
            </div>

            <Dropdown setCategoryComplete={setCategoryComplete} />

            <div className="text-center mt-5">
              <Button
                variant="contained"
                onClick={() => {
                  if (!categoryComplete) {
                    alert("Please select at least one donation category.");
                    return;
                  }

                  setCompleted((prev) => ({
                    ...prev,
                    category: true,
                  }));

                  setActiveTab("collection");
                }}
                sx={buttonStyle}
              >
                Continue
              </Button>
            </div>
          </div>
        </Tab>

        {/* COLLECTION STEP */}
        <Tab
          eventKey="collection"
          title={
            <span
              style={{
                opacity: completed.category ? 1 : 0.4,
              }}
            >
              {completed.collection ? "✓ " : ""}
              Collection
            </span>
          }
        >
          <div
            style={{
              backgroundColor: "#f8f9fa",
              borderRadius: "16px",
              padding: "40px",
              maxWidth: "900px",
              margin: "40px auto",
            }}
          >
            <h2 className="text-center mb-3">Collection Date & Time</h2>

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
              Please select a collection date and time before continuing.
            </div>

            <DateandTime setCollectionComplete={setCollectionComplete} />

            <div className="text-center mt-5">
              <Button
                variant="contained"
                onClick={() => {
                  if (!collectionComplete) {
                    alert("Please select a collection date and time.");
                    return;
                  }

                  setCompleted((prev) => ({
                    ...prev,
                    collection: true,
                  }));

                  setActiveTab("location");
                }}
                sx={buttonStyle}
              >
                Continue
              </Button>
            </div>
          </div>
        </Tab>

        {/* LOCATION STEP */}
        <Tab
          eventKey="location"
          title={
            <span
              style={{
                opacity: completed.category && completed.collection ? 1 : 0.4,
              }}
            >
              {completed.location ? "✓ " : ""}
              Location
            </span>
          }
        >
          <div
            style={{
              backgroundColor: "#f8f9fa",
              borderRadius: "16px",
              padding: "40px",
              maxWidth: "900px",
              margin: "40px auto",
            }}
          >
            <LocationTab setLocationComplete={setLocationComplete} />

            <div className="text-center mt-4">
              <Button
                variant="contained"
                onClick={() => {
                  if (!locationComplete) {
                    alert("Please enter your collection address.");
                    return;
                  }

                  setCompleted((prev) => ({
                    ...prev,
                    location: true,
                  }));

                  setActiveTab("booking");
                }}
                sx={buttonStyle}
              >
                Continue
              </Button>
            </div>
          </div>
        </Tab>

        {/* BOOKING CONFIRMATION */}
        <Tab
          eventKey="booking"
          title={
            <span
              style={{
                opacity:
                  completed.category &&
                  completed.collection &&
                  completed.location
                    ? 1
                    : 0.4,
              }}
            >
              Booking
            </span>
          }
        >
          <div
            style={{
              backgroundColor: "#f8f9fa",
              borderRadius: "16px",
              padding: "50px",
              maxWidth: "700px",
              margin: "40px auto",
              textAlign: "center",
            }}
          >
            <CheckCircleOutlinedIcon
              sx={{
                color: "#0d6efd",
                fontSize: 180,
              }}
            />

            <h2 className="fw-bold mt-3">Donation Booked Successfully</h2>

            <p className="text-muted mt-3">
              Thank you for supporting Benevolent Hearts.
            </p>

            <p className="text-muted">
              Your collection has been scheduled and our team will contact you
              if required.
            </p>

            <div
              className="mt-4 p-3"
              style={{
                backgroundColor: "#e8f5e9",
                borderLeft: "5px solid #28a745",
                borderRadius: "8px",
                textAlign: "left",
              }}
            >
              <strong>✓ Booking Confirmed</strong>

              <p className="mb-0 mt-2">
                Collection details have been recorded. Thank you for your
                donation.
              </p>
            </div>

            <Button
              component={RouterLink}
              to="/"
              variant="contained"
              sx={{
                ...buttonStyle,
                mt: 4,
                color: "#fff",

                "&:hover": {
                  color: "#fff",
                },
              }}
            >
              Back Home
            </Button>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default DonateScreen;
