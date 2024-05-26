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
  Collapse,
} from "@mui/material";
import { regNumberValidationSchema } from "../../../middleware/yup.js";
import { axiosPrivate } from "../../../api/axios.js";
import { useNavigate } from "react-router-dom";
const GetStudent: React.FC = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [result, setResult] = React.useState("");
  const [data, setData] = React.useState({});
  const [card, setCard] = React.useState({});
  const [current, setCurrent] = React.useState({});
  const handleExpandClick = () => {
    setExpanded(!expanded);
    setResult("");
  };

  const navigate = useNavigate();
  const student = {
    regNumber: "",
    temp: 0,
    weight: 0,
    BP: "",
  };
  const handleSubmit = (values: object) => {
    axiosPrivate
      .post("/patient/new-patient", values)
      .then((result) => {
        console.log(result.data);
        if (result.data.registered) {
          setData(result.data.user);
          setCard(result.data.Card);
          setCurrent(result.data.currentVisit);
          handleExpandClick();
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
  const handlePatientDetails = () => {
    navigate("/reception/patient-details", {
      state: { patient: data, currentCard: current },
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
          maxWidth: "30em",
          display: "flex",
          flexDirection: "row",
          padding: "0.5em",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",

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
              {({
                handleSubmit,
                handleBlur,
                handleChange,
                errors,
                touched,
              }) => (
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
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box
            sx={{
              transition: "0.5s ease",
              position: "relative",
              minHeight: "100%",
            }}
          >
            <Typography variant="body2" paragraph>
              Complete Patient Registration
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5em",
                height: "inherit",
                alignItems: "center",
              }}
            >
              <Button onClick={handlePatientDetails} size="small">
                Patient Details
              </Button>
              <Button size="small">Patient Card</Button>
              <Button size="small">Patient History</Button>
              <Button size="small">Returning Patient</Button>
              <Button size="small">Clear Form</Button>
              <Button onClick={handleExpandClick} size="small">
                Close
              </Button>
            </Box>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};
export default GetStudent;
