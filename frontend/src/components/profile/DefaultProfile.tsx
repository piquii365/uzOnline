import {
  Box,
  Typography,
  Paper,
  Autocomplete,
  TextField,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  IconButton,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as React from "react";
import { axiosPrivate } from "../../api/axios.js";
import { useParams } from "react-router-dom";
import { List } from "@mui/icons-material";

const DefaultProfile: React.FC = () => {
  const [user, setUser] = React.useState({});
  const [currentSpecialConditions, setSpecialConditions] = React.useState([]);
  const [currentMedication, setCurrentMedication] = React.useState([]);
  const { id } = useParams();
  React.useLayoutEffect(() => {
    axiosPrivate
      .get(`/${id}/profile`)
      .then((result) => {
        setUser(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axiosPrivate
      .get(`/${id}/special-conditions`)
      .then((result) => {
        setSpecialConditions(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axiosPrivate
      .get(`/${id}/medication`)
      .then((result) => {
        setCurrentMedication(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
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
      <Box sx={{ display: "flex", gap: "0.4em" }}>
        <Box sx={{ flex: 1 }}>
          <Box
            component={Paper}
            sx={{
              width: "100%",
              padding: "0.5em",
              display: "flex",
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
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                }) => (
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
            component={Paper}
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "0.5em",
              marginTop: "0.4em",
              borderRadius: "10px",
              justifyContent: "center",
              width: "100%",
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
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                }) => (
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
                        onChange={(e, value) =>
                          setFieldValue("medications", value)
                        }
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
        <Box
          sx={{
            flex: 3,
            position: "sticky",
            mx: "0.5em",
          }}
        >
          <Box>
            <Box
              component={Paper}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "17em",
                marginLeft: "0.5em",
                borderRadius: "10px",
              }}
            >
              {currentSpecialConditions.length <= 0 ? (
                <Typography paragraph variant="body2">
                  If you have any special medical conditions they will appear
                  here
                </Typography>
              ) : (
                <Box>
                  <Typography variant="body2" paragraph>
                    Recorded Special Conditions
                  </Typography>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Action</TableCell>
                        <TableCell align="left">Condition</TableCell>
                        <TableCell align="left">Notes</TableCell>
                        <TableCell align="left">Date Added</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody
                      sx={{
                        width: "inherit",
                        overflowY: "auto",
                        scrollSnapType: "y-mandatory",
                      }}
                    >
                      {currentSpecialConditions?.map((condition, index) => (
                        <TableRow key={index}>
                          <TableCell align="left">
                            <IconButton>
                              <List />
                            </IconButton>
                          </TableCell>
                          <TableCell align="left">{condition.name}</TableCell>
                          <TableCell align="left">Notes Coming Soon</TableCell>
                          <TableCell align="left">
                            {new Date(condition.createdAt).toDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              )}
            </Box>
          </Box>
          <Box
            component={Paper}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "18.5em",
              marginLeft: "0.5em",
              marginTop: "0.5em",
              borderRadius: "10px",
            }}
          >
            {currentMedication.length <= 0 ? (
              <Typography variant="body2" paragraph>
                If you are taking any medication they will appear here
              </Typography>
            ) : (
              <Box>
                <Typography variant="body2" paragraph>
                  Current Medication
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Action</TableCell>
                      <TableCell align="left">Medicine</TableCell>
                      <TableCell align="left">Notes</TableCell>
                      <TableCell align="left">Date Added</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody
                    sx={{
                      width: "inherit",
                      overflowY: "auto",
                      scrollSnapType: "y-mandatory",
                    }}
                  >
                    {currentMedication?.map((medication, index) => (
                      <TableRow key={index}>
                        <TableCell align="left">
                          <IconButton>
                            <List />
                          </IconButton>
                        </TableCell>
                        <TableCell align="left">{medication.name}</TableCell>
                        <TableCell align="left">Notes Coming Soon</TableCell>
                        <TableCell align="left">
                          {new Date(medication.createdAt).toDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default DefaultProfile;
