import {
  Box,
  Typography,
  Paper,
  Autocomplete,
  TextField,
  Button,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as React from "react";
import { axiosPrivate } from "../../api/axios.js";
import { useParams } from "react-router-dom";
const DefaultProfile: React.FC = () => {
  const { id } = useParams();
  const options = [
    "Cancer",
    "Diabetes",
    "HIV",
    "GONORRHEA",
    "BRAIN DAMAGE",
    "MJOLO",
  ];
  const medication = ["ARV", "AMMOXLYN"];
  const specialConditions = {
    specialConditions: [],
    others: "",
    specialNotes: "",
  };
  const initialMedicationValues = {
    medications: [],
    others: "",
    medicationNotes: "",
  };
  const submitSpecialConditions = (values) => {
    axiosPrivate
      .put(`/profile/${id}/update/specialCondition`, values)
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleMedication = (values) => {
    axiosPrivate
      .put(`/profile/${id}/update/medication`, values)
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Box component="section">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography paragraph variant="body1">
          Welcome to <span>UZ HEALTH HUB</span>
        </Typography>
        <Typography paragraph variant="body2">
          Tell Us More About You So that We know how to help you
        </Typography>
      </Box>
      <Box
        component={Paper}
        sx={{
          width: "15%",
          backgroundColor: "inherit",
          padding: "0.5em",
          display: "flex",
          border: "1px solid #0B212F",
          borderRadius: "10px",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography paragraph variant="body1">
          Provide Special Conditions
        </Typography>
        <Box>
          <Formik
            initialValues={specialConditions}
            onSubmit={submitSpecialConditions}
          >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue }) => (
              <Form onSubmit={handleSubmit}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4em",
                    width: "100%",
                  }}
                >
                  <Autocomplete
                    size="small"
                    multiple
                    fullWidth
                    sx={{ backgroundColor: "white" }}
                    id="specialConditions"
                    options={options}
                    onBlur={handleBlur}
                    onChange={(e, value) =>
                      setFieldValue("specialConditions", value)
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Special Conditions" />
                    )}
                  />
                  <TextField
                    fullWidth
                    id="others"
                    sx={{ backgroundColor: "white" }}
                    size="small"
                    label="others"
                    multiline
                    onBlur={handleBlur}
                    onChange={handleChange}
                    rows={2}
                  />
                  <TextField
                    fullWidth
                    id="specialNotes"
                    sx={{ backgroundColor: "white" }}
                    size="small"
                    label="Special Notes"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    multiline
                    rows={2}
                  />
                  <Button type="submit" size="small" variant="contained">
                    Submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "0.5em",
          border: "1px solid #0B212F",
          marginTop: "0.4em",
          borderRadius: "10px",
          justifyContent: "center",
          width: "15%",
        }}
      >
        <Typography paragraph variant="body1">
          If you are taking an medication you can list them here
        </Typography>
        <Box>
          <Formik
            onSubmit={handleMedication}
            initialValues={initialMedicationValues}
          >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue }) => (
              <Form onSubmit={handleSubmit}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4em",
                    width: "100%",
                  }}
                >
                  <Autocomplete
                    size="small"
                    multiple
                    fullWidth
                    sx={{ backgroundColor: "white" }}
                    id="medications"
                    options={medication}
                    onBlur={handleBlur}
                    onChange={(e, value) => setFieldValue("medications", value)}
                    renderInput={(params) => (
                      <TextField {...params} label="Medication" />
                    )}
                  />
                  <TextField
                    id="other"
                    sx={{ backgroundColor: "white" }}
                    size="small"
                    label="others"
                    multiline
                    rows={2}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <TextField
                    id="specialNotes"
                    sx={{ backgroundColor: "white" }}
                    size="small"
                    label="Special Notes"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    multiline
                    rows={2}
                  />
                  <Button type="submit" size="small" variant="contained">
                    Submit
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
export default DefaultProfile;
