import { Home, Logout } from "@mui/icons-material";
import {
  Stack,
  Box,
  styled,
  IconButton,
  Typography,
  Link,
  Tooltip,
  Button,
} from "@mui/material";
import * as React from "react";
const ItemContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: "0.5em",
  alignItems: "center",
});
const PharmacyNav: React.FC = ({ user, username }) => {
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
          <IconButton size="small">
            <Home />
          </IconButton>
        </Tooltip>
      </ItemContainer>
      <ItemContainer>
        <Tooltip title={"Profile"}>
          <Button href={`/pharmacy/${user}`} size="small" component={Link}>
            {username}
          </Button>
        </Tooltip>
        <Tooltip title="Logout">
          <IconButton size="small">
            <Logout />
          </IconButton>
        </Tooltip>
      </ItemContainer>
    </Stack>
  );
};

export default PharmacyNav;
