import { Box, Button, ButtonGroup, Paper, Link, styled } from "@mui/material";
import * as React from "react";
const NavButton = styled(Button)({
  display: "flex",
  justifyContent: "start",
  border: "none",
  borderRadius: 0,
  color: "#293855",
  "&:hover": { backgroundColor: "gray", border: "none" },
});
const Sidebar: React.FC = () => {
  return (
    <Box
      component={Paper}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5em",
        padding: "0.5em",
        minHeight: "inherit",
        width: "17em",
        boxShadow: "none",
      }}
    >
      <ButtonGroup
        sx={{ display: "flex", flexDirection: "column", gap: "0.5em" }}
      >
        <NavButton
          href="/doctor/my-schedule"
          component={Link}
          fullWidth
          size="small"
        >
          My Schedule
        </NavButton>
        <NavButton
          sx={{ display: "flex", justifyContent: "start" }}
          href="/doctor/patients"
          component={Link}
          fullWidth
          size="small"
        >
          Patients
        </NavButton>
        <NavButton
          href="/doctor/history"
          component={Link}
          fullWidth
          size="small"
        >
          History
        </NavButton>
        <NavButton
          href="/doctor/appointments"
          component={Link}
          fullWidth
          size="small"
        >
          Appointments
        </NavButton>
      </ButtonGroup>
    </Box>
  );
};

export default Sidebar;
