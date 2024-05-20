import {
  Button,
  TextField,
  Typography,
  Box,
  Card,
  Divider,
  Link,
} from "@mui/material";
import { Formik, Form } from "formik";
import axios from "../../api/axios.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (values: object) => {
    axios
      .post("/auth/signin", values)
      .then((result) => {
        if (result.data.error) {
          setError(result.data.Result);
        } else {
          navigate(`/${result.data.id}/profile`);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "90vh",
      }}
    >
      <Card
        sx={{
          p: "1.5em 3em",
          transition: "0.5s ease",
          minWidth: "18%",
          borderRadius: "10px",
          "&:hover": {
            boxShadow:
              "20.6px 8.6px 37.8px -31px rgba(0, 0, 0, 0.006),38px 15.8px 65.4px -31px rgba(0, 0, 0, 0.014),54.4px 22.6px 89.5px -31px rgba(0, 0, 0, 0.023),70.7px 29.4px 112.2px -31px rgba(0, 0, 0, 0.033),87.3px 36.3px 134.6px -31px rgba(0, 0, 0, 0.045),104.9px 43.7px 157.1px -31px rgba(0, 0, 0, 0.058),125px 52px 180px -31px rgba(0, 0, 0, 0.07)",
            minWidth: "20%",
          },
        }}
      >
        <Typography paragraph>
          <span>Welcome</span>
        </Typography>
        <Typography paragraph variant="body2">
          Log in to continue.
        </Typography>
        <Divider />
        {error && (
          <Typography variant={"body2"} color={"red"}>
            {error}
          </Typography>
        )}

        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, handleChange, handleBlur }) => (
            <Form onSubmit={handleSubmit}>
              <Box component={"article"} sx={{ my: "0.5em" }}>
                <TextField
                  fullWidth
                  size="small"
                  id="email"
                  label="Email, Username or Reg Number"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  helperText={"This field is required"}
                />
              </Box>
              <Box component={"article"} sx={{ my: "0.5em" }}>
                <TextField
                  fullWidth
                  size="small"
                  type="password"
                  id="password"
                  label="Password"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  helperText={"Password is required"}
                />
              </Box>
              <Box component={"article"} sx={{ my: "0.5em" }}>
                <Button
                  fullWidth
                  size="small"
                  type="submit"
                  sx={{
                    backgroundColor: "blue",
                    color: "white",
                    my: "0.5em",
                    "&:hover": { color: "black", backgroundColor: "gray" },
                  }}
                >
                  Log In
                </Button>
              </Box>
              <Box component={"article"} sx={{ my: "0.2em", display: "flex" }}>
                <Link
                  href="/auth/register"
                  sx={{ textAlign: "center", color: "black" }}
                >
                  I wan't to create on account ?
                </Link>
                <Link
                  href="/auth/forgot-password"
                  underline="none"
                  sx={{ textAlign: "center" }}
                >
                  forgot password
                </Link>
              </Box>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
};

export default Login;
