import * as React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import ReceptionHeader from "../components/administration/receptionist/ReceptionHeader";
const Reception: React.FC = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        height: "80dvh",
      }}
    >
      <ReceptionHeader />
      <Box component={"section"}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Reception;
