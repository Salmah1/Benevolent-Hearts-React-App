import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function Hero() {
  const buttonStyle = {
    width: "200px",
    height: "44px",
    borderRadius: "8px",
    fontWeight: 600,
  };

  return (
    <section className="hero vh-100 d-flex align-items-center" id="home">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto text-center">
            <h6
              style={{
                color: "#ffffff",
                fontWeight: 600,
                letterSpacing: "1px",
              }}
            >
              WELCOME
            </h6>

            <h1 className="display-3 fw-bold text-white mt-3">
              Supporting Communities Together
            </h1>

            <p
              className="lead text-white mt-4 mb-5"
              style={{
                maxWidth: "700px",
                margin: "0 auto",
              }}
            >
              Donate items, shop for a cause, volunteer your time and support
              community campaigns that make a real difference to people in need.
            </p>

            <div className="d-flex justify-content-center flex-wrap gap-3">
              <Button
                component={Link}
                to="/donate"
                variant="contained"
                sx={{
                  ...buttonStyle,
                  backgroundColor: "#ffffff",
                  color: "#0d6efd",

                  "&:hover": {
                    background: "#0d6efd",
                    color: "#fff",
                  },
                }}
              >
                Donate Items
              </Button>

              <Button
                component={Link}
                to="/products/list"
                variant="outlined"
                sx={{
                  ...buttonStyle,
                  borderColor: "#ffffff",
                  color: "#ffffff",

                  "&:hover": {
                    background: "#d7d5d5b9",
                  },
                }}
              >
                Shop Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
