import React, { Component } from "react";
import Button from "@mui/material/Button";

class GetLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: "",
    };
  }

  position = () => {
    if (!navigator.geolocation) {
      this.setState({
        error: "Geolocation is not supported by your browser.",
      });

      return;
    }

    navigator.geolocation.getCurrentPosition(
      // Detect the user's current location using the browser geolocation API
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: "",
        });

        if (this.props.setLocationComplete) {
          this.props.setLocationComplete(true);
        }
      },
      () => {
        this.setState({
          error: "Unable to retrieve your location.",
        });
      },
    );
  };

  render() {
    return (
      <div>
        <Button
          variant="outlined"
          onClick={this.position}
          sx={{
            borderRadius: "8px",
            fontWeight: 600,
          }}
        >
          Detect My Location
        </Button>

        {this.state.latitude && (
          <div
            className="mt-3"
            style={{
              backgroundColor: "#e8f5e9",
              borderLeft: "5px solid #28a745",
              borderRadius: "8px",
              padding: "12px",
            }}
          >
            <strong>✓ Location detected successfully</strong>
            <p className="mt-2 mb-3">
              Your current location has been detected and will be used for
              collection.
            </p>

            {/* Display embedded Google Map after successful location detection */}
            <iframe
              title="location-map"
              width="100%"
              height="250"
              style={{
                border: 0,
                borderRadius: "10px",
              }}
              loading="lazy"
              src={`https://maps.google.com/maps?q=${this.state.latitude},${this.state.longitude}&z=15&output=embed`}
            />
          </div>
        )}

        {this.state.error && (
          <div
            className="mt-3"
            style={{
              backgroundColor: "#fff3cd",
              borderLeft: "5px solid #ffc107",
              borderRadius: "8px",
              padding: "12px",
            }}
          >
            {this.state.error}
          </div>
        )}
      </div>
    );
  }
}

export default GetLocation;
