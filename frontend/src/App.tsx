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
import DefaultProfile from "./components/profile/DefaultProfile";
import PatientDetails from "./components/administration/receptionist/PatientDetails";
import AddStudent from "./components/administration/receptionist/AddStudent";
import GetStudent from "./components/administration/receptionist/GetStudent";
import Reception from "./pages/Reception";
import AdminRegister from "./components/administration/AdminRegister";
import AdminLogin from "./components/administration/AdminLogin";

const App: React.FC = () => {
  return (
    <Box sx={{ margin: 0, padding: 0, boxSizing: "border-box" }}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/reception" element={<Reception />}>
            <Route path="/reception/add-student" element={<AddStudent />} />
            <Route path="/reception/get-student" element={<GetStudent />} />
            <Route
              path="/reception/patient-details"
              element={<PatientDetails />}
            />
          </Route>
          <Route path="/auth/register" element={<Register />} />
          <Route path="/:id/profile" element={<Profile />}>
            <Route path="/:id/profile/medication" element={<Medication />} />
            <Route
              path="/:id/profile/appointments"
              element={<Appointments />}
            />
            <Route path="/:id/profile" element={<DefaultProfile />} />
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
