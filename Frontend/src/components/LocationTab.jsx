import React, { useState } from "react";
import GetLocation from "./GetLocation";

function LocationTab({ setLocationComplete, showHeading = true }) {
  const [addressMethod, setAddressMethod] = useState("manual");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [postcode, setPostcode] = useState("");

  const countries = ["England", "Scotland", "Wales", "Northern Ireland"];

  const cities = {
    England: [
      "London",
      "Manchester",
      "Birmingham",
      "Liverpool",
      "Leeds",
      "Sheffield",
      "Bristol",
      "Nottingham",
      "Romford",
    ],

    Scotland: ["Glasgow", "Edinburgh", "Aberdeen", "Dundee", "Inverness"],

    Wales: ["Cardiff", "Swansea", "Newport", "Wrexham", "Bangor"],

    "Northern Ireland": [
      "Belfast",
      "Derry",
      "Lisburn",
      "Newtownabbey",
      "Bangor",
    ],
  };

  // Update completion status when manual address changes
  React.useEffect(() => {
    if (addressMethod === "manual") {
      const complete = country && city && street.trim() && postcode.trim();

      setLocationComplete(Boolean(complete));
    }
  }, [addressMethod, country, city, street, postcode, setLocationComplete]);

  // Reset completion status when switching address method
  React.useEffect(() => {
    setLocationComplete(false);
  }, [addressMethod, setLocationComplete]);

  return (
    <section className="py-1">
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        {showHeading && <h2 className="text-center mb-4">Delivery Address</h2>}

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
          Please choose how you would like to provide your delivery address.
        </div>

        <div className="mb-4 text-center">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="addressMethod"
              checked={addressMethod === "manual"}
              onChange={() => setAddressMethod("manual")}
            />
            <label className="form-check-label fw-semibold">
              Enter Address Manually
            </label>
          </div>

          <div className="form-check form-check-inline ms-4">
            <input
              className="form-check-input"
              type="radio"
              name="addressMethod"
              checked={addressMethod === "auto"}
              onChange={() => setAddressMethod("auto")}
            />

            <label className="form-check-label fw-semibold">
              Use Current Location
            </label>
          </div>
        </div>

        {addressMethod === "manual" && (
          <>
            <div className="mb-4">
              <label className="form-label fw-bold">Country *</label>

              <select
                className="form-select"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setCity("");
                }}
              >
                <option value="">Select a country</option>

                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold">City *</label>

              <select
                className="form-select"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={!country}
              >
                <option value="">
                  {country ? "Select a city" : "Select a country first"}
                </option>

                {country &&
                  cities[country].map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold">Street Address *</label>

              <input
                type="text"
                className="form-control"
                placeholder="e.g. 10 High Street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold">Postcode *</label>

              <input
                type="text"
                className="form-control"
                placeholder="e.g. RM1 1AA or SW1A 1AA"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
              />
            </div>
          </>
        )}

        {addressMethod === "auto" && (
          <div
            className="mt-4 p-3"
            style={{
              backgroundColor: "#f8f9fa",
              borderRadius: "10px",
            }}
          >
            <h6 className="mb-3 fw-bold">Location Detection</h6>

            <p className="text-muted mb-3">
              Allow location access and we'll automatically detect your address.
            </p>

            <GetLocation setLocationComplete={setLocationComplete} />
          </div>
        )}
      </div>
    </section>
  );
}

export default LocationTab;
