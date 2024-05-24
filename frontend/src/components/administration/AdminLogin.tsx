import * as React from "react";
import {
  Box,
  Divider,
  Paper,
  Typography,
  TextField,
  FormControl,
  Button,
  Link,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { Formik, Form } from "formik";
import { axiosPrivate } from "../../api/axios.js";
import { useNavigate } from "react-router-dom";

const AdminLogin: React.FC = () => {
  const [result, setResult] = React.useState("");
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
    role: "",
  };
  const handleSubmit = (values) => {
    axiosPrivate
      .post("/admin/sign-admin", values)
      .then((response) => {
        if (response.data.status) {
          if (response.data.user.role == "Receptionist") {
            navigate("/reception", { state: response.data.user });
          } else if (response.data.user.role == "Doctor") {
            navigate("/doctor", { state: response.data.user });
          } else {
            setResult("Other User Views will be placed here");
          }
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
        justifyContent: "center",
        alignItems: "center",
        maxHeight: "90vh",
        overflow: "hidden",
      }}
    >
      <Box
        component={Paper}
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "0.5em",
          width: "17em",
        }}
      >
        <Typography variant="body1" paragraph>
          Welcome
        </Typography>
        <Typography variant="body2" paragraph>
          Provide Reg Number
        </Typography>
        {result && (
          <Typography color="red" variant="body2" paragraph>
            {result}
          </Typography>
        )}
        <Divider />
        <Box>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ handleSubmit, handleBlur, handleChange }) => (
              <Form onSubmit={handleSubmit}>
                <Box
                  component={FormControl}
                  sx={{ py: "0.5em", width: "100%" }}
                >
                  <TextField
                    fullWidth
                    size="small"
                    id="username"
                    type="text"
                    label="Username or Email address"
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
                    label="Password"
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
                  <Button size="small" type="submit" variant="contained">
                    Submit
                  </Button>
                </Box>
                <Box
                  component={FormControl}
                  sx={{ py: "0.5em", width: "100%" }}
                >
                  <Button href="/admin/register" size="small" component={Link}>
                    I want to create an account
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

export default AdminLogin;
