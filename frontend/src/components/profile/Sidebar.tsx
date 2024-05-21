import * as React from "react";
import {
  Stack,
  Fab,
  Typography,
  Box,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  styled,
  Link,
} from "@mui/material";
import {
  AddAPhoto,
  Edit,
  AccessTime,
  History,
  Medication,
  Logout,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
const Sidebar: React.FC = ({ user }) => {
  const { id } = useParams();
  return (
    <Stack
      sx={{
        minWidth: "18em",
        position: "sticky",
        borderRadius: "10px",
        marginTop: "0.4em",
        overflowY: "auto",
        scrollBehavior: "smooth",
        backgroundColor: "#4265D6",
        overflowX: "hidden",
        color: "white",
        scrollSnapType: "y-mandatory",
      }}
      component={"aside"}
    >
      <Box
        sx={{
          backgroundColor: "#293855",
          width: "100%",
          height: "12em",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "0.5em",
        }}
      >
        <Typography>{user?.username}</Typography>
        <Box
          sx={{
            position: "relative",
            width: "80%",
            height: "90%",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <CardMedia
            sx={{
              height: "92%",
              width: "60%",
              borderRadius: "50%",
            }}
            image={`http://localhost:3001/profile/${user?.profilePicture}`}
            title="Profile"
          />
          <Fab
            size="small"
            sx={{
              position: "absolute",
              bottom: 10,
              right: 35,
            }}
          >
            <AddAPhoto />
          </Fab>
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0.5em",
        }}
      >
        <Typography paragraph variant="body1" color="#1A1A1A">
          Personal Details
        </Typography>
        <Box>
          <List sx={{ width: "100%", bgcolor: "inherit" }}>
            <ListItem
              disableGutters
              secondaryAction={
                <IconButton disabled>
                  <Edit />
                </IconButton>
              }
            >
              <ListItemText primary={user?.fullName} />
            </ListItem>
            <ListItem
              disableGutters
              secondaryAction={
                <IconButton>
                  <Edit />
                </IconButton>
              }
            >
              <ListItemText primary={user?.email} />
            </ListItem>
            <ListItem
              disableGutters
              secondaryAction={
                <IconButton disabled>
                  <Edit />
                </IconButton>
              }
            >
              <ListItemText primary={user?.regNumber} />
            </ListItem>
            <ListItem
              disableGutters
              secondaryAction={
                <IconButton disabled>
                  <Edit />
                </IconButton>
              }
            >
              <ListItemText primary={user?.gender} />
            </ListItem>
          </List>
          <Button size="small" fullWidth sx={{ color: "#1A1A1A" }}>
            Change Password
          </Button>
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "0.5em",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Button
            component={Link}
            href={`/profile/${id}/medial-history`}
            sx={{ display: "flex", justifyContent: "start", color: "#293855" }}
            size="small"
            fullWidth
            color="inherit"
            startIcon={<History />}
          >
            Medical History
          </Button>
          <Button
            component={Link}
            href={`/profile/${id}/appointments`}
            sx={{ display: "flex", justifyContent: "start", color: "#293855" }}
            size="small"
            fullWidth
            color="inherit"
            startIcon={<AccessTime />}
          >
            Appointments
          </Button>
          <Button
            component={Link}
            href={`/profile/${id}/medication`}
            sx={{ display: "flex", justifyContent: "start", color: "#293855" }}
            size="small"
            fullWidth
            color="inherit"
            startIcon={<Medication />}
          >
            Medication
          </Button>
          <Button
            sx={{ display: "flex", justifyContent: "start", color: "#293855" }}
            size="small"
            fullWidth
            color="inherit"
            startIcon={<Logout />}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

export default Sidebar;
