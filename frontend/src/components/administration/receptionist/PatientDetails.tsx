import {
  Box,
  Typography,
  Paper,
  Table,
  TableCell,
  TableRow,
  TableHead,
  Badge,
  TableBody,
  Link,
  Button,
} from "@mui/material";
import * as React from "react";

import { useLocation } from "react-router-dom";
const PatientDetails: React.FC = () => {
  const { state } = useLocation();
  const patient = state.patient;

  return (
    <Box
      sx={{
        width: "100%",
        margin: 0,
        padding: 0,
        display: "flex",
        height: "100dvh",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Box
          component={Paper}
          sx={{
            minWidth: "17em",
            display: "flex",
            alignItems: "start",
            gap: "0.5em",
            flexDirection: "column",
            paddingTop: "1em",
            height: "100dvh",
          }}
        >
          <Badge badgeContent={patient?.medicalHistory?.length}>
            <Button href="#medicalHistory" component={Link} fullWidth>
              Medical History
            </Button>
          </Badge>
          <Badge badgeContent={patient?.specialConditions?.length}>
            <Button href="#specialConditions" component={Link} fullWidth>
              Special Conditions
            </Button>
          </Badge>
          <Badge badgeContent={patient?.medication?.length}>
            <Button href="#medication" component={Link} fullWidth>
              Medication
            </Button>
          </Badge>
        </Box>
        <Box
          component={Paper}
          sx={{
            marginLeft: "0.5em",
            width: "76.5dvw",
            padding: "2em 1em",
            display: "flex",
            overflowY: "scroll",
            height: "inherit",
            gap: "0.5em",
          }}
        >
          <Box
            component={Paper}
            sx={{
              width: "inherit",
              display: "flex",
              flexDirection: "column",
              boxShadow: "none",
              padding: "0.5em 2em",
              marginBottom: "2em",
            }}
          >
            <Typography variant="body1" paragraph>
              <strong>Patient Information.</strong>
            </Typography>
            {patient ? (
              <Table sx={{ width: "inherit" }}>
                <tbody>
                  <TableRow>
                    <TableCell component={"th"}>
                      <small>Full Name</small>
                    </TableCell>
                    <TableCell component={"td"}>
                      <small>{patient.fullName}</small>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component={"th"}>
                      <small>Reg Number</small>
                    </TableCell>
                    <TableCell component={"td"}>
                      <small>{patient.regNumber}</small>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component={"th"}>
                      <small>Address</small>
                    </TableCell>
                    <TableCell component={"td"}>
                      <small>{patient.physicalAddress}</small>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component={"th"}>
                      <small>Gender</small>
                    </TableCell>
                    <TableCell component={"td"}>
                      <small>{patient.gender}</small>
                    </TableCell>
                  </TableRow>
                </tbody>
              </Table>
            ) : (
              <Typography variant="body2" paragraph>
                Loading....
              </Typography>
            )}

            <Typography variant="body2" paragraph>
              <strong>Next Of Kin</strong>
            </Typography>
            {patient ? (
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component={"th"}>
                      <small>Name</small>
                    </TableCell>
                    <TableCell component={"td"}>
                      <small>{patient.nextOfKin}</small>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component={"th"}>
                      <small>Address</small>
                    </TableCell>
                    <TableCell component={"td"}>
                      <small>{patient.nextOfKinAddress}</small>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component={"th"}>
                      <small>Contact</small>
                    </TableCell>
                    <TableCell component={"td"}>
                      <small>
                        <Link href={`tel:${patient.nextOfKinPhoneNumber}`}>
                          {patient.nextOfKinPhoneNumber}
                        </Link>
                      </small>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component={"th"}>
                      <small>Relationship</small>
                    </TableCell>
                    <TableCell component={"td"}>
                      <small>{patient.nextOfKinRelationship}</small>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ) : (
              <Typography variant="body2" paragraph>
                Next of kin details were not provided
              </Typography>
            )}

            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                padding: "0.5em",
              }}
            >
              <Box id="#medication" sx={{ maxHeight: "50%" }}>
                <Typography variant="body2" paragraph>
                  Medication
                </Typography>
                <Box>
                  {patient ? (
                    <Table sx={{ maxHeight: "inherit", overflowY: "auto" }}>
                      <TableHead sx={{ backgroundColor: "#293855" }}>
                        <TableRow>
                          <TableCell component={"th"} sx={{ color: "white" }}>
                            <small>No</small>
                          </TableCell>
                          <TableCell component={"th"} sx={{ color: "white" }}>
                            <small>Name</small>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      {patient.medication.length > 0 && (
                        <TableBody>
                          {patient.medication.map((drug, index) => (
                            <TableRow key={index}>
                              <TableCell component={"td"}>
                                <small>{index}</small>
                              </TableCell>
                              <TableCell component={"td"}>
                                <small>{drug.name}</small>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      )}
                    </Table>
                  ) : (
                    <Typography>Medication Not available</Typography>
                  )}
                </Box>
              </Box>
              <Box id="specialConditions">
                <Typography variant="body2" paragraph>
                  Special Conditions
                </Typography>
                <Box sx={{ maxHeight: "50%" }}>
                  {patient ? (
                    <Table
                      sx={{
                        width: "100%",
                        overflowY: "auto",
                        maxHeight: "inherit",
                      }}
                    >
                      <TableHead sx={{ backgroundColor: "#293855" }}>
                        <TableRow>
                          <TableCell component={"th"} sx={{ color: "white" }}>
                            <small>Condition</small>
                          </TableCell>
                          <TableCell component={"th"} sx={{ color: "white" }}>
                            <small>Medication</small>
                          </TableCell>
                          <TableCell component={"th"} sx={{ color: "white" }}>
                            <small>Personnel In Charge</small>
                          </TableCell>
                          <TableCell component={"th"} sx={{ color: "white" }}>
                            <small>Date Registered</small>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {patient.specialConditions.length > 0 &&
                          patient.specialConditions.map((condition, index) => (
                            <TableRow key={index}>
                              <TableCell component={"td"}>
                                <small>{condition.name}</small>
                              </TableCell>
                              <TableCell component={"td"}>
                                <small>Medication</small>
                              </TableCell>
                              <TableCell component={"td"}>
                                <small>Personnel In Charge</small>
                              </TableCell>
                              <TableCell component={"td"}>
                                <small>
                                  {new Date(condition.createdAt).toDateString()}
                                </small>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <Typography variant="body2" paragraph>
                      Special Conditions history not available yet
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
            <Box id="medicalHistory">
              <Typography>Medical History</Typography>
              <Box>
                {patient ? (
                  <Table>
                    <TableHead sx={{ backgroundColor: "#293855" }}>
                      <TableRow>
                        <TableCell component={"th"} sx={{ color: "white" }}>
                          <small>Date</small>
                        </TableCell>
                        <TableCell component={"th"} sx={{ color: "white" }}>
                          <small>Participants</small>
                        </TableCell>
                        <TableCell component={"th"} sx={{ color: "white" }}>
                          <small>Prescription</small>
                        </TableCell>
                        <TableCell component={"th"} sx={{ color: "white" }}>
                          <small>Status</small>
                        </TableCell>
                        <TableCell component={"th"} sx={{ color: "white" }}>
                          <small>Notes</small>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                ) : (
                  <Typography variant="body2" paragraph>
                    Medical history not available yet
                  </Typography>
                )}
                <Table>
                  <TableHead sx={{ backgroundColor: "#293855" }}>
                    <TableRow>
                      <TableCell component={"th"} sx={{ color: "white" }}>
                        <small>Date</small>
                      </TableCell>
                      <TableCell component={"th"} sx={{ color: "white" }}>
                        <small>Participants</small>
                      </TableCell>
                      <TableCell component={"th"} sx={{ color: "white" }}>
                        <small>Prescription</small>
                      </TableCell>
                      <TableCell component={"th"} sx={{ color: "white" }}>
                        <small>Status</small>
                      </TableCell>
                      <TableCell component={"th"} sx={{ color: "white" }}>
                        <small>Notes</small>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PatientDetails;
