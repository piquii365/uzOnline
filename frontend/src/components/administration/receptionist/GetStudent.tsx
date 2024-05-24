import * as React from "react";
import { Formik, Form } from "formik";
import {
  Box,
  Divider,
  Paper,
  Typography,
  TextField,
  FormControl,
  Button,
  Link,
} from "@mui/material";
import { regNumberValidationSchema } from "../../../middleware/yup.js";
import { axiosPrivate } from "../../../api/axios.js";
import { useNavigate } from "react-router-dom";
const GetStudent: React.FC = () => {
  const [result, setResult] = React.useState("");
  const navigate = useNavigate();
  const student = {
    regNumber: "",
    temp: 0,
    weight: 0,
    BP: "",
  };
  const handleSubmit = (values: object) => {
    console.log(values);
    axiosPrivate
      .post("/patient/new-patient", values)
      .then((result) => {
        console.log(result.data);
        if (result.data.registered) {
          setResult("New Patient Added Successfully");
        } else {
          setResult("Patient not Registered");
          console.log(result.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80dvh",
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
            <small>{result}</small>
          </Typography>
        )}
        <Divider />
        <Box>
          <Formik
            initialValues={student}
            onSubmit={handleSubmit}
            validationSchema={regNumberValidationSchema}
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
                  sx={{
                    py: "0.5em",
                    width: "100%",
                    flexDirection: "row",
                    gap: "0.5em",
                  }}
                >
                  <TextField
                    fullWidth
                    size="small"
                    id="temp"
                    inputProps={{
                      step: 0.01,
                      min: 34,
                      max: 42,
                    }}
                    type="number"
                    label="Temp"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    id="weight"
                    inputProps={{
                      step: 0.01,
                      min: 15,
                      max: 120,
                    }}
                    type="number"
                    label="Weight"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    id="BP"
                    type="text"
                    label="Blood Pressure"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
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
                  <Button
                    href="/reception/add-student"
                    size="small"
                    component={Link}
                  >
                    Register Student
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
export default GetStudent;
