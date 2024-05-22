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
import { addStudentValidationSchema } from "../../../middleware/yup.js";
import { axiosPrivate } from "../../../api/axios.js";
const GetStudent: React.FC = () => {
  const student = {
    regNumber: "",
  };
  const handleSubmit = (values: object) => {
    console.log("Button Clicked");
    axiosPrivate
      .get("/auth/student", values)
      .then((result) => {
        console.log(result.data);
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
          backgroundColor: "#D9EFF7",
        }}
      >
        <Typography variant="body1" paragraph>
          Welcome
        </Typography>
        <Typography variant="body2" paragraph>
          Provide Reg Number
        </Typography>
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
