import * as React from "react";
import { Link as ReactLink } from "react-router-dom";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Avatar,
  Button,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { UserContext } from "./UserContext";
import { CartContext } from "./CartContext";

const pages = ["Donate", "Shop", "Volunteer"];
const pagesPaths = ["/donate", "/products/list", "/volunteer"];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { loggedIn, avatar, logoutUser } = React.useContext(UserContext);

  const { cartItems } = React.useContext(CartContext);

  React.useEffect(() => {
    const handleResize = () => {
      setAnchorElNav(null);
      setAnchorElUser(null);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const buttonStyle = {
    width: "120px",
    height: "44px",
    borderRadius: "8px",
    fontWeight: 600,
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #e9ecef",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: "80px",
          }}
        >
          {/* LOGO */}
          <Box
            component={ReactLink}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <Box
              component="img"
              src="/img/bh.png"
              alt="Benevolent Hearts"
              sx={{
                height: { xs: 38, md: 55 },
                cursor: "pointer",
              }}
            />
          </Box>

          {/* DESKTOP NAVIGATION */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", lg: "flex" },
              justifyContent: "center",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Button
              component={ReactLink}
              to="/donate"
              variant="contained"
              sx={{
                ...buttonStyle,
                color: "#fff",

                "&:hover": {
                  color: "#fff",
                },
              }}
            >
              Donate
            </Button>

            <Button
              component={ReactLink}
              to="/products/list"
              sx={{
                ...buttonStyle,
                color: "#212529",
                textTransform: "none",

                "&:hover": {
                  border: "1px solid #0d6efd",
                  backgroundColor: "#f8f9fa",
                  color: "#0d6efd",
                },
              }}
            >
              SHOP
            </Button>

            <Button
              component={ReactLink}
              to="/volunteer"
              sx={{
                ...buttonStyle,
                color: "#212529",
                textTransform: "none",

                "&:hover": {
                  border: "1px solid #0d6efd",
                  backgroundColor: "#f8f9fa",
                  color: "#0d6efd",
                },
              }}
            >
              VOLUNTEER
            </Button>

            <Button
              component={ReactLink}
              to="/cart"
              startIcon={<ShoppingCartIcon />}
              variant="outlined"
              sx={{
                ...buttonStyle,
              }}
            >
              Cart ({cartItems.length})
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              ml: "auto",
            }}
          >
            {/* MOBILE MENU */}
            <Box
              sx={{
                display: { xs: "flex", lg: "none" },
                mr: 1,
              }}
            >
              <IconButton onClick={handleOpenNavMenu} color="primary">
                <MenuIcon />
              </IconButton>

              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                PaperProps={{
                  sx: {
                    borderRadius: "12px",
                    mt: 1,
                    minWidth: 200,
                  },
                }}
              >
                {pages.map((page, i) => (
                  <MenuItem
                    key={page}
                    component={ReactLink}
                    to={pagesPaths[i]}
                    onClick={handleCloseNavMenu}
                  >
                    {page}
                  </MenuItem>
                ))}

                <MenuItem
                  component={ReactLink}
                  to="/cart"
                  onClick={handleCloseNavMenu}
                >
                  Cart ({cartItems.length})
                </MenuItem>
              </Menu>
            </Box>

            {/* USER MENU */}
            <Tooltip title="Account">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  p: 1,
                }}
              >
                <Avatar
                  alt="avatar"
                  src={avatar}
                  sx={{
                    width: { xs: 32, lg: 42 },
                    height: { xs: 32, lg: 42 },
                    border: "2px solid #e9ecef",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  }}
                />
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              PaperProps={{
                sx: {
                  borderRadius: "12px",
                  mt: 1,
                  minWidth: 180,
                },
              }}
            >
              {loggedIn ? (
                <>
                  <MenuItem
                    component={ReactLink}
                    to="/profile"
                    onClick={handleCloseUserMenu}
                  >
                    <Typography>My Profile</Typography>
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      logoutUser();
                      handleCloseUserMenu();
                    }}
                  >
                    <Typography>Log Out</Typography>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem
                    component={ReactLink}
                    to="/register"
                    onClick={handleCloseUserMenu}
                  >
                    <Typography>Register</Typography>
                  </MenuItem>

                  <MenuItem
                    component={ReactLink}
                    to="/login"
                    onClick={handleCloseUserMenu}
                  >
                    <Typography>Log In</Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
