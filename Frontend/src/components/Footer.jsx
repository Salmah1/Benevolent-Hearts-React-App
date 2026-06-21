import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer
        style={{
          backgroundColor: "#f8f9fa",
          borderTop: "1px solid #e9ecef",
          marginTop: "80px",
        }}
      >
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-5 mb-4">
              <h6
                style={{
                  color: "#0d6efd",
                  fontWeight: 600,
                  letterSpacing: "1px",
                }}
              >
                BENEVOLENT HEARTS
              </h6>

              <h3 className="fw-bold mb-3">Supporting Communities Together</h3>

              <p className="text-muted">
                Benevolent Hearts helps communities through donations,
                volunteering opportunities and charitable fundraising
                initiatives. Every contribution helps create a positive impact.
              </p>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <h6
                className="fw-bold mb-3"
                style={{
                  color: "#0d6efd",
                }}
              >
                Explore
              </h6>

              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="/" className="text-decoration-none text-muted">
                    Home
                  </Link>
                </li>

                <li className="mb-2">
                  <Link
                    to="/donate"
                    className="text-decoration-none text-muted"
                  >
                    Donate Items
                  </Link>
                </li>

                <li className="mb-2">
                  <Link
                    to="/products/list"
                    className="text-decoration-none text-muted"
                  >
                    Shop Products
                  </Link>
                </li>

                <li className="mb-2">
                  <Link
                    to="/volunteer"
                    className="text-decoration-none text-muted"
                  >
                    Volunteer
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <h6
                className="fw-bold mb-3"
                style={{
                  color: "#0d6efd",
                }}
              >
                Contact
              </h6>

              <p className="text-muted mb-2">
                Email: info@benevolenthearts.org
              </p>

              <p className="text-muted mb-2">Phone: +44 (0)20 1234 5678</p>

              <p className="text-muted">
                Supporting communities across the United Kingdom.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <div
        style={{
          backgroundColor: "#0d6efd",
          color: "#fff",
        }}
      >
        <div className="container py-3 text-center">
          © {new Date().getFullYear()} Benevolent Hearts. All rights reserved.
        </div>
      </div>
    </>
  );
}

export default Footer;
