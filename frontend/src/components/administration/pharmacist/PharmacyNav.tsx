import { Home, Logout } from "@mui/icons-material";
import {
  Stack,
  Box,
  styled,
  IconButton,
  Link,
  Tooltip,
  Button,
} from "@mui/material";
import * as React from "react";
import { axiosPrivate } from "../../../api/axios.js";
const ItemContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: "0.5em",
  alignItems: "center",
});
const PharmacyNav: React.FC = ({ user, username }) => {
  const id = user;
  const handleLogout = () => {
    axiosPrivate.get("/logout").then(() => {
      window.location.href = "/admin";
    });
  };
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        p: "0.5em",
      }}
    >
      <ItemContainer>
        <Tooltip title="Home">
          <IconButton href={"/pharmacy"} component={Link} size="small">
            <Home />
          </IconButton>
        </Tooltip>
      </ItemContainer>
      <ItemContainer>
        <Tooltip title={"Profile"}>
          <Button
            href={`/pharmacy/${id}/profile`}
            size="small"
            component={Link}
          >
            {username}
          </Button>
        </Tooltip>
        <Tooltip title="Logout">
          <IconButton onClick={handleLogout} size="small">
            <Logout />
          </IconButton>
        </Tooltip>
      </ItemContainer>
    </Stack>
  );
};

export default PharmacyNav;
