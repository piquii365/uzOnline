import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  Divider,
  FormControl,
  Paper,
  IconButton,
} from "@mui/material";
import * as React from "react";
import { regNumberValidationSchema } from "../../../middleware/yup.js";
import { Formik, Form } from "formik";
import { Close } from "@mui/icons-material";
import { axiosPrivate } from "../../../api/axios.js";
import { useNavigate, useParams } from "react-router-dom";
const NewPatient = ({ open, handleClose }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = React.useState("");
  const initialValues = {
    regNumber: "",
  };
  const handleSubmit = (values) => {
    axiosPrivate
      .get(`/patient/details/${values.regNumber}`)
      .then((result) => {
        if (result.data.registered) {
          navigate(`/doctor/${id}/current-patient/${values.regNumber}`, {
            state: result.data.id,
          });
          handleClose();
        } else {
          setResult("Patient not Registered please ask the reception for help");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          component={Paper}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
            padding: "0.5em",
            width: "17em",
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 0, right: 0 }}
          >
            <Close />
          </IconButton>

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
            <Formik
              initialValues={initialValues}
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
                    sx={{ py: "0.5em", width: "100%" }}
                  >
                    <Button size="small" type="submit" variant="contained">
                      Submit
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default NewPatient;
