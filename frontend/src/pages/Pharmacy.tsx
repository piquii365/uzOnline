import { Box } from "@mui/material";
import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";
import PharmacyNav from "../components/administration/pharmacist/PharmacyNav";
const Pharmacy: React.FC = () => {
  const { state } = useLocation();
  const currentUser = state ? state.id : null;
  const currentUsername = state ? state.username : "Failed to fetch Username..";
  return (
    <Box
      sx={{
        position: "fixed",
        width: "99dvw",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <PharmacyNav user={currentUser} username={currentUsername} />
      <Outlet />
    </Box>
  );
};

export default Pharmacy;
