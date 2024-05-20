import * as React from "react";

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
  Link,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import AdbIcon from "@mui/icons-material/Adb";

const Header = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        top: 0,
        bgcolor: "white",
        color: "#181d50",
        px: 0,
        borderBottom: "1px solid #FF731D",
        boxShadow: "none",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#FF731D",
              textDecoration: "none",
            }}
          >
            uzHealthHub
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            UzHealthHub
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              gap: "0.4em",
              display: { xs: "none", md: "flex" },
            }}
          >
            <Link href={`/`} component={Button} underline="hover">
              HOME
            </Link>
            <Link href={`/help-center`} component={Button} underline="hover">
              HELP CENTER
            </Link>
            <Link href={`/about`} component={Button} underline="hover">
              ABOUT
            </Link>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Button sx={{ color: "#181d50" }} href="/auth/login">
              Sign In
            </Button>
            <Button
              href="/auth/register"
              sx={{
                color: "white",
                backgroundColor: "#181d50",
                margin: "0.5em 0.5em",
                "&:hover": { color: "#181d50" },
              }}
            >
              Sign Up
            </Button>
            <Tooltip title="My Profile">
              <IconButton
                size="small"
                component={Link}
                href={`/${100}/profile`}
              >
                <Avatar>X</Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
