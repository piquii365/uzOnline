import {
  Typography,
  Box,
  Paper,
  Autocomplete,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import { axiosPrivate } from "../../../api/axios.js";
import * as React from "react";
import { Formik, Form } from "formik";
import { useParams } from "react-router-dom";
import CardCompleteModal from "./CardCompleteModal.js";
const Card: React.FC = ({ currentCard }) => {
  const { id } = useParams();
  const [card, setCard] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = (card) => {
    setCard(card);
    setOpen(true);
  };
  const handleCose = () => {
    setOpen(false);
  };
  const descriptions: string[] = [
    "Gonorrhea",
    "HIV",
    "Headache",
    "Stomach pains",
    "back pains",
    "eye problems",
  ];
  const drugs: string[] = [
    "Amoxcylin 200mg",
    "Paracetamol 500mg",
    "Ibrufenamol 500mg",
  ];
  const initialValues = {
    prescription: [],
    description: [],
    recommendation: "",
  };
  console.log(currentCard);
  const handleSubmit = (values) => {
    axiosPrivate
      .put(`patient/${id}/doctor-prescription/${currentCard}`, values)
      .then((result) => {
        console.log(result.data);
        if (result.data.status) {
          handleOpen(result.data.FullPrescription);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Box
      component={Paper}
      sx={{ padding: "0.5em", height: "100%", width: "inherit" }}
    >
      <Typography sx={{ color: "#1A1A1A" }}>
        Patient Conditions and Prescription is recorded here
      </Typography>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ handleChange, handleBlur, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <Box sx={{ my: "0.2em" }} component={FormControl} fullWidth>
              <Autocomplete
                fullWidth
                id="description"
                size="small"
                multiple
                autoHighlight
                autoSelect
                freeSolo
                disableClearable
                onChange={(event, newValue) => {
                  if (typeof newValue === "string") {
                    setFieldValue("description", newValue);
                  } else if (newValue && newValue.event) {
                    setFieldValue("description", newValue.event);
                  } else {
                    setFieldValue("description", newValue);
                  }
                }}
                onBlur={handleBlur}
                options={descriptions.map((option) => option)}
                renderInput={(params) => (
                  <TextField {...params} label="Description" />
                )}
              />
            </Box>

            <Box sx={{ my: "0.2em" }} component={FormControl} fullWidth>
              <Autocomplete
                fullWidth
                id="prescription"
                size="small"
                freeSolo
                multiple
                disableClearable
                onChange={(event, newValue) => {
                  if (typeof newValue === "string") {
                    setFieldValue("prescription", newValue);
                  } else if (newValue && newValue.event) {
                    setFieldValue("prescription", newValue.event);
                  } else {
                    setFieldValue("prescription", newValue);
                  }
                }}
                onBlur={handleBlur}
                options={drugs.map((drug) => drug)}
                renderInput={(params) => (
                  <TextField {...params} label="Prescription" />
                )}
              />
            </Box>

            <Box sx={{ my: "0.2em" }} component={FormControl} fullWidth>
              <TextField
                fullWidth
                id="recommendation"
                size="small"
                multiline
                minRows={3}
                label="Overall Recommendation"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Box>
            <Box
              sx={{
                my: "0.2em",
                display: "flex",
                gap: "0.5em",
                flexDirection: "row",
              }}
              component={FormControl}
              fullWidth
            >
              <Button
                sx={{
                  bgcolor: "green",
                  maxWidth: "fit-content",
                  color: "white",
                  "&:hover": { bgcolor: "gray" },
                }}
                size="small"
                type="submit"
              >
                Done
              </Button>
              <Button
                sx={{
                  bgcolor: "#293855",
                  maxWidth: "fit-content",
                  color: "white",
                  "&:hover": { bgcolor: "#BEC3C7" },
                }}
                size="small"
              >
                Schedule Appointment
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      <CardCompleteModal card={card} open={open} handleClose={handleCose} />
    </Box>
  );
};

export default Card;
