import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Navigation/Header";
import { Box } from "@mui/material";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MedicalHistory from "./components/profile/MedicalHistory";
import Medication from "./components/profile/Medication";
import Appointments from "./components/profile/Appointments";

const App: React.FC = () => {
  return (
    <Box sx={{ margin: 0, padding: 0, boxSizing: "border-box" }}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/:id/profile" element={<Profile />}>
            <Route path="/:id/profile/medication" element={<Medication />} />
            <Route
              path="/:id/profile/appointments"
              element={<Appointments />}
            />
            <Route
              path="/:id/profile/medical-history"
              element={<MedicalHistory />}
            />
          </Route>
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
