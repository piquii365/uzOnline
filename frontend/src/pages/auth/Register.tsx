import * as React from "react";
import axios from "../../api/axios.js";
import { registerValidationSchema } from "../../middleware/yup.js";
import {
  Box,
  Card,
  Typography,
  TextField,
  Link,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState();

  const initialValues = {
    fullName: "",
    confirmPassword: "",
    username: "",
    email: "",
    password: "",
    regNumber: "",
    gender: "",
  };
  const handleFormSubmit = (values): void => {
    axios
      .post("/auth/register", values)
      .then((res) => {
        if (res.data.status) {
          navigate("/auth/register");
        } else {
          setError(res.data.Result);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        alignItems: "center",
      }}
    >
      <Card sx={{ p: "1.5em 3em", width: "18%" }}>
        <Typography variant={"h6"}>Welcome</Typography>
        <Typography variant={"body1"}>Create your profile</Typography>
        <br />
        {error && (
          <Typography variant="body2" color="red">
            {error}
          </Typography>
        )}
        <Divider color={"black"} />
        <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          validationSchema={registerValidationSchema}
        >
          {({ handleChange, handleSubmit, handleBlur, touched, errors }) => (
            <Form onSubmit={handleSubmit}>
              <Box component={"article"} sx={{ my: "0.5em" }}>
                <TextField
                  fullWidth
                  size="small"
                  id="fullName"
                  label="Full Name"
                  variant="standard"
                  required
                  onChange={handleChange}
                  error={touched.fullName && Boolean(errors.fullName)}
                  helperText={touched.fullName && errors.fullName}
                  onBlur={handleBlur}
                />
              </Box>
              <Box component={"article"} sx={{ my: "0.5em" }}>
                <TextField
                  fullWidth
                  size="small"
                  id="email"
                  type="email"
                  label="Email"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Box>
              <Box component={"article"} sx={{ my: "0.5em" }}>
                <TextField
                  fullWidth
                  size="small"
                  id="username"
                  label="Username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="standard"
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />
              </Box>
              <Box component={"article"} sx={{ my: "0.5em" }}>
                <TextField
                  fullWidth
                  type="password"
                  size="small"
                  id="password"
                  label="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="standard"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Box>
              <Box component={"article"} sx={{ my: "0.5em" }}>
                <TextField
                  fullWidth
                  type="password"
                  size="small"
                  id="confirmPassword"
                  label="Confirm Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="standard"
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
              </Box>
              <Box component={"article"} sx={{ my: "0.5em" }}>
                <TextField
                  fullWidth
                  size="small"
                  id="regNumber"
                  label="Reg Number"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.regNumber && Boolean(errors.regNumber)}
                  helperText={touched.regNumber && errors.regNumber}
                />
              </Box>
              <Box component={"article"} sx={{ my: "0.5em" }}>
                <FormControl>
                  <FormLabel id="gender">Gender</FormLabel>
                  <RadioGroup
                    aria-labelledby="gender"
                    defaultValue="Male"
                    onChange={handleChange}
                    name="gender"
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
                </FormControl>
              </Box>
              <Box component={"article"} sx={{ my: "0.5em" }}>
                <Button
                  fullWidth
                  size="small"
                  type="submit"
                  sx={{
                    backgroundColor: "blue",
                    color: "white",
                    my: "0.4em",
                    "&:hover": { backgroundColor: "gray", color: "white" },
                  }}
                >
                  Create Account
                </Button>
                <Link
                  href="/auth/login"
                  underline="none"
                  sx={{ m: "0.5em 1em" }}
                >
                  I already have an account
                </Link>
              </Box>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
};

export default Register;
