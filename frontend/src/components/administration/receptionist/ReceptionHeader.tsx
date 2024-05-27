import {
  Add,
  Logout,
  People,
  GroupAdd,
  Home,
  Input,
} from "@mui/icons-material";
import {
  Stack,
  IconButton,
  Box,
  Tooltip,
  Link,
  Typography,
  Button,
} from "@mui/material";
import * as React from "react";
import { axiosPrivate } from "../../../api/axios.js";
const ReceptionHeader: React.FC = () => {
  const handleLogout = () => {
    axiosPrivate.get("/logout").then(() => {
      window.location.href = "/admin";
    });
  };
  return (
    <Stack
      direction={"row"}
      sx={{
        padding: "0.5em",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "0.5em",
        }}
      >
        <Tooltip title="Home">
          <IconButton href="/reception" size="small" component={Link}>
            <Home />
          </IconButton>
        </Tooltip>
        <Tooltip title="New Patient">
          <IconButton
            href="/reception/get-student"
            size="small"
            component={Link}
          >
            <GroupAdd />
          </IconButton>
        </Tooltip>
        <Tooltip title="Register Patient">
          <IconButton
            href="/reception/add-student"
            size="small"
            component={Link}
          >
            <Input />
          </IconButton>
        </Tooltip>
        <Tooltip title="View Patients">
          <IconButton size="small" component={Link}>
            <People />
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Tooltip title="Logout">
          <IconButton size="small" onClick={handleLogout}>
            <Logout />
          </IconButton>
        </Tooltip>
      </Box>
    </Stack>
  );
};

export default ReceptionHeader;
