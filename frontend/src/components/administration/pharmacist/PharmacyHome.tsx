import {
  Box,
  Stack,
  Button,
  styled,
  Paper,
  Typography,
  FormControl,
  TextField,
  Divider,
} from "@mui/material";
import { Formik, Form } from "formik";
import { regNumberValidationSchema } from "../../../middleware/yup.js";
import { axiosPrivate } from "../../../api/axios.js";
import * as React from "react";
import { useNavigate } from "react-router-dom";
const NavButton = styled(Button)({
  display: "flex",
  justifyContent: "start",
  border: "none",
  borderRadius: 0,
  color: "#293855",
  "&:hover": { backgroundColor: "gray", border: "none", color: "white" },
});
const PharmacyHome: React.FC = () => {
  const initialValues = {
    regNumber: "",
  };
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    axiosPrivate
      .post(`/patient/prescription`, values)
      .then((result) => {
        if (result.data.status) {
          navigate(`/pharmacy/card/${values.regNumber}`, {
            state: result.data.Prescription,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Box
      component={"main"}
      sx={{
        display: "flex",
        width: "inherit",
        position: "relative",
        flexDirection: "row",
        padding: "0.5em",
      }}
    >
      <Stack
        sx={{
          width: "17em",
          height: "inherit",
          display: "flex",
          direction: "column",
          gap: "0.5em",
        }}
        direction="column"
        component="aside"
      >
        <NavButton>New Patient</NavButton>
        <NavButton>Dispensary</NavButton>
        <NavButton>Stock</NavButton>
        <NavButton>History</NavButton>
      </Stack>
      <Divider color="black" orientation="vertical" flexItem />
      <Box
        component={"section"}
        sx={{
          width: "inherit",
          height: "inherit",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component={Paper}
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "0.5em",
            gap: "0.5em",
            width: "17dvw",
          }}
        >
          <Typography variant="body2" paragraph>
            Enter Patient Reg Number.
          </Typography>
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
                  <Box
                    component={FormControl}
                    sx={{ py: "0.5em", width: "100%" }}
                  >
                    <Divider textAlign="center">
                      <Button size="small" type="submit">
                        Returning Patient
                      </Button>
                    </Divider>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PharmacyHome;
