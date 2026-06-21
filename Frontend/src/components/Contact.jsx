import React, { useState } from "react";
import Button from "@mui/material/Button";

function Contact() {
  const contactStyle = {
    color: "#dc3545",
  };

  // Form state
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  // Update form fields
  function handleChange(e) {
    setSuccess(false);

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  // Submit contact form
  function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      alert("Please complete all required fields before submitting.");
      return;
    }

    // Display success message
    setSuccess(true);

    // Reset form fields
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    });
  }

  return (
    <section className="py-5" id="contact">
      <div className="container">
        {/* PAGE HEADER */}
        <div className="row">
          <div className="col-md-8 mx-auto text-center">
            <h6
              style={{
                color: "#0d6efd",
                fontWeight: 600,
                letterSpacing: "1px",
              }}
            >
              CONTACT US
            </h6>

            <h2 className="fw-bold">Get In Touch</h2>

            <p className="text-muted">
              Have a question about donations, volunteering, fundraising or our
              services? We'd love to hear from you.
            </p>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div
          style={{
            backgroundColor: "#f8f9fa",
            borderRadius: "16px",
            padding: "40px",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">
                  First Name <span style={contactStyle}>*</span>
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="e.g. John"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">
                  Last Name <span style={contactStyle}>*</span>
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="e.g. Smith"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">
                Email Address <span style={contactStyle}>*</span>
              </label>

              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. johnsmith@example.com"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">
                Subject <span style={contactStyle}>*</span>
              </label>

              <select
                className="form-select"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="Donation Enquiry">Donation Enquiry</option>
                <option value="Volunteering">Volunteering</option>
                <option value="Fundraising">Fundraising</option>
                <option value="Products & Shop">Products & Shop</option>
                <option value="General Enquiry">General Enquiry</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold">
                Message <span style={contactStyle}>*</span>
              </label>

              <textarea
                className="form-control"
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
              />
            </div>

            {/* SUCCESS MESSAGE */}
            {success && (
              <div
                className="mb-4"
                style={{
                  backgroundColor: "#d1e7dd",
                  color: "#0f5132",
                  padding: "12px",
                  borderRadius: "8px",
                  borderLeft: "5px solid #198754",
                }}
              >
                <strong>✓ Message Sent</strong>

                <p className="mb-0 mt-2">
                  Thank you for contacting Benevolent Hearts. We have received
                  your message and will get back to you as soon as possible.
                </p>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <div className="text-center">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "220px",
                  height: "44px",
                  borderRadius: "8px",
                  fontWeight: 600,
                }}
              >
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
