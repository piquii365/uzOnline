import * as React from "react";
import {
  Box,
  Divider,
  Paper,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  Link,
} from "@mui/material";
import { Formik, Form } from "formik";
import { axiosPrivate } from "../../api/axios.js";
import { useNavigate } from "react-router-dom";
const AdminRegister: React.FC = () => {
  const navigate = useNavigate();
  const [result, setResult] = React.useState("");
  const initialValues = {
    username: "",
    email: "",
    password: "",
    fullName: "",
    confirmPassword: "",
    gender: "",
    role: "",
    idNumber: "",
    phoneNumber: "",
    address: "",
  };
  const handleSubmit = (values: object) => {
    axiosPrivate
      .post("/admin/new-admin", values)
      .then((response) => {
        if (response.data.status) {
          navigate("/admin/login");
        } else {
          setResult(response.data.Result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component={Paper}
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "0.5em",
          width: "20em",
        }}
      >
        <Typography variant="body1" paragraph>
          Administration
        </Typography>
        <Typography variant="body2" paragraph>
          Register
        </Typography>
        {result && (
          <Typography color="red" variant="body2" paragraph>
            {result}
          </Typography>
        )}
        <Divider />
        <Box>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ handleSubmit, handleBlur, handleChange, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <Box
                  component={FormControl}
                  sx={{ py: "0.5em", width: "100%" }}
                >
                  <TextField
                    fullWidth
                    size="small"
                    id="fullName"
                    type="text"
                    label="Full Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    error={touched.fullName && Boolean(errors.fullName)}
                    helperText={touched.fullName && errors.fullName}
                  />
                </Box>
                <Box
                  component={FormControl}
                  sx={{ py: "0.5em", width: "100%" }}
                >
                  <TextField
                    fullWidth
                    size="small"
                    id="username"
                    type="text"
                    label="Username"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Box>
                <Box
                  component={FormControl}
                  sx={{ py: "0.5em", width: "100%" }}
                >
                  <TextField
                    fullWidth
                    size="small"
                    id="email"
                    type="email"
                    label="Email"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Box>
                <Box
                  component={FormControl}
                  sx={{ py: "0.5em", width: "100%" }}
                >
                  <TextField
                    fullWidth
                    size="small"
                    id="password"
                    type="password"
                    label="password"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Box>
                <Box
                  component={FormControl}
                  sx={{ py: "0.5em", width: "100%" }}
                >
                  <TextField
                    fullWidth
                    size="small"
                    id="confirmPassword"
                    type="password"
                    required
                    label="Confirm Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Box>
                <Box
                  component={FormControl}
                  sx={{ py: "0.5em", width: "100%" }}
                >
                  <FormLabel id="role">Role</FormLabel>
                  <RadioGroup
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-labelledby="role"
                    name="role"
                    defaultValue="Nurse"
                    aria-required
                  >
                    <FormControlLabel
                      value="Admin"
                      control={<Radio />}
                      label="Admin"
                      disabled
                    />
                    <FormControlLabel
                      value="Receptionist"
                      control={<Radio />}
                      label="Receptionist"
                    />
                    <FormControlLabel
                      value="Doctor"
                      control={<Radio />}
                      label="Doctor"
                    />
                    <FormControlLabel
                      value="Pharmacist"
                      control={<Radio />}
                      label="Pharmacist"
                    />
                    <FormControlLabel
                      value="Nurse"
                      control={<Radio />}
                      label="Nurse"
                    />
                  </RadioGroup>
                </Box>
                <Box
                  component={FormControl}
                  sx={{ py: "0.5em", width: "100%" }}
                >
                  <FormLabel id="gender">Gender</FormLabel>
                  <RadioGroup
                    onChange={handleChange}
                    onBlur={handleBlur}
                    row
                    aria-labelledby="gender"
                    name="gender"
                    defaultValue="Male"
                    aria-required
                  >
                    <FormControlLabel
                      value="Female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="Male"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                </Box>
                <Box
                  component={FormControl}
                  sx={{ py: "0.5em", width: "100%" }}
                >
                  <TextField
                    fullWidth
                    size="small"
                    id="idNumber"
                    label="Id Number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                </Box>
                <Box
                  component={FormControl}
                  sx={{ py: "0.5em", width: "100%" }}
                >
                  <TextField
                    fullWidth
                    size="small"
                    id="address"
                    label="address"
                    multiline
                    onChange={handleChange}
                    onBlur={handleBlur}
                    minRows={3}
                    required
                  />
                </Box>
                <Box
                  component={FormControl}
                  sx={{ py: "0.5em", width: "100%" }}
                >
                  <TextField
                    fullWidth
                    size="small"
                    id="phoneNumber"
                    label="Phone Number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                </Box>
                <Box
                  component={FormControl}
                  sx={{ py: "0.5em", width: "100%" }}
                >
                  <Button size="small" type="submit" variant="contained">
                    Save
                  </Button>
                </Box>
                <Box
                  component={FormControl}
                  sx={{ py: "0.5em", width: "100%" }}
                >
                  <Button href="/admin/login" size="small" component={Link}>
                    I already have an account
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminRegister;
