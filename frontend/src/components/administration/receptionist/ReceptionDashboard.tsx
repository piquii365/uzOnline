import { Box, Stack, Button, Link } from "@mui/material";
import * as React from "react";
import { Outlet } from "react-router-dom";

const ReceptionDashboard: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack spacing={2} sx={{ width: "100%" }} direction={"row"}>
        <Button size="small" href="/reception" component={Link}>
          Register Student
        </Button>
        <Button size="small" href="/reception/student-records" component={Link}>
          Student Records
        </Button>
      </Stack>
      <Box component={"section"}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default ReceptionDashboard;