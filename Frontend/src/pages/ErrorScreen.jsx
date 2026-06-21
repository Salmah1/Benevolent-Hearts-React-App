import { Link } from "react-router-dom";
import { Button } from "@mui/material";

function ErrorScreen() {
  const buttonStyle = {
    width: "200px",
    height: "44px",
    borderRadius: "8px",
    fontWeight: 600,
  };

  return (
    <div className="container py-5">
      {/* PAGE NOTICE */}
      <div
        className="mt-4 p-3"
        style={{
          backgroundColor: "#fff3cd",
          color: "#664d03",
          borderRadius: "8px",
          maxWidth: "550px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        Please use one of the options below to continue browsing.
      </div>

      {/* ERROR CONTENT */}
      <div
        className="text-center"
        style={{
          maxWidth: "700px",
          margin: "50px auto",
        }}
      >
        <h6
          style={{
            color: "#0d6efd",
            fontWeight: 600,
            letterSpacing: "1px",
          }}
        >
          ERROR
        </h6>

        <h1
          className="fw-bold"
          style={{
            fontSize: "120px",
            color: "#0d6efd",
            lineHeight: 1,
          }}
        >
          404
        </h1>

        <h2 className="fw-bold mt-3">Page Not Found</h2>

        <p
          className="text-muted mt-3"
          style={{
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          The page you are looking for does not exist.
        </p>

        {/* ACTION BUTTONS */}
        <div className="d-flex justify-content-center flex-wrap gap-3 mt-5">
          <Button
            component={Link}
            to="/"
            variant="contained"
            sx={{
              ...buttonStyle,
              color: "#fff",

              "&:hover": {
                color: "#fff",
              },
            }}
          >
            Back Home
          </Button>

          <Button
            component={Link}
            to="/products/list"
            variant="outlined"
            sx={{
              ...buttonStyle,
            }}
          >
            Shop Products
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ErrorScreen;
