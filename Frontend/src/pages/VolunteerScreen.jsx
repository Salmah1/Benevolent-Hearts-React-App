import React, { useState } from "react";
import Button from "@mui/material/Button";

function VolunteerScreen() {
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Submit volunteer application
  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !interest.trim() || !message.trim()) {
      alert("Please complete all required fields before submitting.");
      return;
    }

    // Display success message
    setSubmitted(true);

    // Reset form fields
    setName("");
    setEmail("");
    setInterest("");
    setMessage("");
  }

  return (
    <div className="py-5">
      <div className="container">
        {/* PAGE HEADER */}
        <div className="text-center mb-5">
          <h6
            style={{
              color: "#0d6efd",
              fontWeight: 600,
              letterSpacing: "1px",
            }}
          >
            GET INVOLVED
          </h6>

          <h1 className="fw-bold">Become a Volunteer</h1>

          <p className="lead text-muted">
            Join our community and use your skills to make a positive impact.
          </p>

          <div
            className="text-center mt-4"
            style={{
              backgroundColor: "#fff3cd",
              color: "#664d03",
              padding: "12px",
              borderRadius: "8px",
              maxWidth: "650px",
              margin: "0 auto",
            }}
          >
            Complete the application form below and tell us how you'd like to
            support us.
          </div>
        </div>

        {/* VOLUNTEER OPPORTUNITIES */}
        <div
          className="mb-5"
          style={{
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <h3 className="fw-bold text-center mb-4">Volunteer Opportunities</h3>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="volunteer-card h-100 p-4">
                <h5>📚 Teaching & Mentoring</h5>
                <p className="text-muted mb-0">
                  Deliver educational workshops, tutoring sessions and mentoring
                  opportunities for members of the community.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="volunteer-card h-100 p-4">
                <h5>📢 Campaign Support</h5>
                <p className="text-muted mb-0">
                  Assist with fundraising initiatives, awareness campaigns and
                  community outreach activities.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="volunteer-card h-100 p-4">
                <h5>🎉 Event Organisation</h5>
                <p className="text-muted mb-0">
                  Help plan and coordinate charity events, workshops and
                  community projects throughout the year.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="volunteer-card h-100 p-4">
                <h5>📸 Photography & Media</h5>
                <p className="text-muted mb-0">
                  Capture events and create engaging content for our website,
                  campaigns and social media platforms.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="volunteer-card h-100 p-4">
                <h5>🎨 Creative Design</h5>
                <p className="text-muted mb-0">
                  Design posters, graphics, videos and promotional materials to
                  support our charitable initiatives.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="volunteer-card h-100 p-4">
                <h5>💻 Technology Support</h5>
                <p className="text-muted mb-0">
                  Contribute technical skills to improve digital services,
                  websites and community-focused projects.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* VOLUNTEER APPLICATION FORM */}
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            backgroundColor: "#f8f9fa",
            padding: "40px",
            borderRadius: "16px",
          }}
        >
          <h3 className="text-center fw-bold mb-4">Volunteer Application</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Full Name *</label>

              <input
                type="text"
                className="form-control"
                placeholder="e.g. John Smith"
                value={name}
                onChange={(e) => {
                  setSubmitted(false);
                  setName(e.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Email Address *</label>

              <input
                type="email"
                className="form-control"
                placeholder="e.g. johnsmith@example.com"
                value={email}
                onChange={(e) => {
                  setSubmitted(false);
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Area of Interest *</label>

              <select
                className="form-select"
                value={interest}
                onChange={(e) => {
                  setSubmitted(false);
                  setInterest(e.target.value);
                }}
              >
                <option value="">Select an option</option>
                <option value="Teaching">Teaching & Mentoring</option>
                <option value="Campaigns">Campaign Support</option>
                <option value="Events">Event Organisation</option>
                <option value="Photography">Photography & Media</option>
                <option value="Creative">Creative Design</option>
                <option value="Technology">Technology Support</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold">
                Why would you like to volunteer? *
              </label>

              <textarea
                rows="5"
                className="form-control"
                placeholder="Tell us about yourself, your experience, and why you'd like to volunteer with us."
                value={message}
                onChange={(e) => {
                  setSubmitted(false);
                  setMessage(e.target.value);
                }}
              />
            </div>

            {/* SUCCESS MESSAGE */}
            {submitted && (
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
                <strong>✓ Application Submitted</strong>

                <p className="mb-0 mt-2">
                  Thank you for your interest in volunteering with Benevolent
                  Hearts. Our team will review your application and contact you
                  if suitable opportunities become available.
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
                Submit Application
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VolunteerScreen;
