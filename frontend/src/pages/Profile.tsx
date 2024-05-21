import * as React from "react";
import Sidebar from "../components/profile/Sidebar";
import { Stack, Box } from "@mui/material";
import { axiosMediaPrivate } from "../api/axios.js";
import { Outlet, useParams } from "react-router-dom";
const Profile: React.FC = () => {
  const { id } = useParams();
  const [user, setUser] = React.useState({});
  React.useEffect(() => {
    axiosMediaPrivate
      .get(`/${id}/profile`)
      .then((result) => {
        setUser(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Stack component={"main"} direction={"row"}>
      <Sidebar user={user} />
      <Box
        sx={{
          position: "sticky",
          borderRadius: "10px",
          marginTop: "0.4em",
          marginLeft: "0.4em",
          backgroundColor: "#D9EFF7",
          width: "100vw",
          padding: "0.5em",
        }}
      >
        <Outlet />
      </Box>
    </Stack>
  );
};

export default Profile;
