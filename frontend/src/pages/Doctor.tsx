import { Box } from "@mui/material";
import * as React from "react";
import { Outlet } from "react-router-dom";
import DoctorNav from "../components/administration/doctor/DoctorNav";

const Doctor: React.FC = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
      }}
    >
      <DoctorNav />
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Doctor;
