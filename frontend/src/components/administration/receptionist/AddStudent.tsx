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
import * as React from "react";
import { Formik, Form } from "formik";
import { addStudentValidationSchema } from "../../../middleware/yup.js";
import { axiosPrivate } from "../../../api/axios.js";
const AddStudent: React.FC = () => {
  const [result, setResult] = React.useState("");
  const student = {
    fullName: "",
    username: "",
    regNumber: "",
    password: "",
    email: "",
    gender: "",
  };
  const handleSubmit = (values: object) => {
    const finalValue = {
      fullName: values.fullName,
      username: values.fullName.split(" ")[0],
      regNumber: values.regNumber,
      password: values.fullName.split(" ")[0],
      email: `${values.fullName.replaceAll(/ /g, "")}@gmail.com`,
      gender: values.gender,
    };
    axiosPrivate
      .post("/auth/register", finalValue)
      .then((result) => {
        if (result.data.status || result.data.registered) {
          setResult("THIS USER IS ALREADY REGISTERED");
        } else setResult(result.data.Result);
      })
      .catch((error) => {
        console.log(error);
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
          width: "17em",
          backgroundColor: "#D9EFF7",
        }}
      >
        <Typography variant="body1" paragraph>
          Welcome
        </Typography>
        <Typography variant="body2" paragraph>
          Add Student
        </Typography>
        {result && (
          <Typography color="red" variant="body2" paragraph>
            <small>{result}</small>
          </Typography>
        )}
        <Divider />
        <Box>
          <Formik
            initialValues={student}
            onSubmit={handleSubmit}
            validationSchema={addStudentValidationSchema}
          >
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
                    disabled
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
                    disabled
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
                    disabled
                  />
                </Box>
                <Box
                  component={FormControl}
                  sx={{ py: "0.5em", width: "100%" }}
                >
                  <TextField
                    fullWidth
                    size="small"
                    id="regNumber"
                    type="text"
                    label="Reg Number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.regNumber && Boolean(errors.regNumber)}
                    helperText={touched.regNumber && errors.regNumber}
                  />
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
                  <Button size="small" type="submit" variant="contained">
                    Save
                  </Button>
                </Box>
                <Box
                  component={FormControl}
                  sx={{ py: "0.5em", width: "100%" }}
                >
                  <Button
                    href="/reception/get-student"
                    size="small"
                    component={Link}
                  >
                    Add Student
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

export default AddStudent;
