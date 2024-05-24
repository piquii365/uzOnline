import * as React from "react";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";
import MainContent from "./MainContent";

const DoctorHome: React.FC = () => {
  return (
    <Box sx={{ display: "flex", height: "82.5dvh", gap: "0.5em" }}>
      <Sidebar />
      <MainContent />
    </Box>
  );
};

export default DoctorHome;
