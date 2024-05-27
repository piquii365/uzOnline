import { Home, Logout, Add } from "@mui/icons-material";
import { Stack, Box, IconButton, Tooltip, Link } from "@mui/material";
import * as React from "react";
import NewPatient from "./NewPatient";
import { axiosPrivate } from "../../../api/axios.js";
const DoctorNav: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleLogout = () => {
    axiosPrivate.get("/logout").then(() => {
      window.location.href = "/admin";
    });
  };
  return (
    <>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: "0.5em 1em",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", gap: "0.5em", alignItems: "center" }}>
          <Tooltip title="Home">
            <IconButton size="small" href="/doctor" component={Link}>
              <Home />
            </IconButton>
          </Tooltip>
          <Tooltip onClick={handleOpen} title="New Patient">
            <IconButton size="small">
              <Add />
            </IconButton>
          </Tooltip>
          <NewPatient open={open} handleClose={handleClose} />
        </Box>
        <Box>
          <Tooltip title="Logout">
            <IconButton size="small" onClick={handleLogout}>
              <Logout />
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>
    </>
  );
};

export default DoctorNav;
