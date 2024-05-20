import * as React from "react";
import Sidebar from "../components/profile/Sidebar";
import { Stack, Box } from "@mui/material";
import { axiosPrivate } from "../api/axios.js";
import { Outlet, useParams } from "react-router-dom";
const Profile: React.FC = () => {
  const { id } = useParams();
  const [user, setUser] = React.useState({});
  React.useEffect(() => {
    console.log("Page loaded");
    axiosPrivate
      .get(`/${id}/profile`)
      .then((result) => {
        setUser(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Stack component={"main"}>
      <Sidebar user={user} />
      <Box sx={{ margin: 0, padding: 0, boxSizing: "border-box" }}>
        <Outlet />
      </Box>
    </Stack>
  );
};

export default Profile;
