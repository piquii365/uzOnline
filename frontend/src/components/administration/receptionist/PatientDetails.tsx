import {
  Box,
  Typography,
  Paper,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Link,
} from "@mui/material";
import * as React from "react";

import { axiosPrivate } from "../../../api/axios.js";
import { useLocation } from "react-router-dom";

const PatientDetails: React.FC = () => {
  const { state: regNumber } = useLocation();
  const [student, setStudent] = React.useState({
    fullName: "",
    regNumber: "",
    physicalAddress: "",
    specialConditions: [],
    medication: [],
    medicalHistory: [],
    gender: "",
    nextOfKin: "",
    nextOfKinAddress: "",
    nextOfKinRelationship: "",
    nextOfKinPhoneNumber: "",
  });
  React.useEffect(() => {
    axiosPrivate
      .post("/student/student-info", { regNumber })
      .then((result) => {
        setStudent({
          ...student,
          fullName: result.data.fullName,
          regNumber: result.data.regNumber,

          physicalAddress:
            result.data.address !== undefined
              ? result.data.address
              : "Not Provided",
          specialConditions: result.data.specialConditions,
          medication: result.data.medication,
          medicalHistory: result.data.medicalHistory,
          gender: result.data.gender,
          nextOfKin:
            result.data.nextOfKin?.name !== undefined
              ? result.data.nextOfKin.name
              : "Not Provided",
          nextOfKinAddress:
            result.data.nextOfKin?.address !== undefined
              ? result.data.nextOfKin.address
              : "Not Provided",
          nextOfKinRelationship:
            result.data.nextOfKin?.relationship !== undefined
              ? result.data.nextOfKin.relationship
              : "Not Provided",
          nextOfKinPhoneNumber:
            result.data.nextOfKin?.phoneNumber !== undefined
              ? result.data.nextOfKin.phoneNumber
              : "Not Provided",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log(student);
  return (
    <Box
      sx={{
        width: "100%",
        margin: 0,
        padding: 0,
        display: "flex",
      }}
    >
      <Box
        component={Paper}
        sx={{
          minWidth: "17em",
          position: "sticky",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          padding: "0.5em",
          height: "100dvh",
          overflow: "hidden",
        }}
      >
        <Typography paragraph>OUR RECEPTION</Typography>
        <Box
          component={Paper}
          sx={{
            width: "inherit",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "none",
          }}
        >
          <Typography variant="body1" paragraph>
            Patient Information.
          </Typography>
          <Table>
            <tbody>
              <TableRow>
                <TableCell component={"th"}>
                  <small>Full Name</small>
                </TableCell>
                <TableCell component={"td"}>
                  <small>{student.fullName}</small>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component={"th"}>
                  <small>Reg Number</small>
                </TableCell>
                <TableCell component={"td"}>
                  <small>{student.regNumber}</small>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component={"th"}>
                  <small>Address</small>
                </TableCell>
                <TableCell component={"td"}>
                  <small>{student.physicalAddress}</small>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component={"th"}>
                  <small>Gender</small>
                </TableCell>
                <TableCell component={"td"}>
                  <small>{student.gender}</small>
                </TableCell>
              </TableRow>
            </tbody>
          </Table>
          <Typography variant="body2" paragraph>
            <strong>Next Of Kin</strong>
          </Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell component={"th"}>
                  <small>Name</small>
                </TableCell>
                <TableCell component={"td"}>
                  <small>{student.nextOfKin}</small>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component={"th"}>
                  <small>Address</small>
                </TableCell>
                <TableCell component={"td"}>
                  <small>{student.nextOfKinAddress}</small>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component={"th"}>
                  <small>Contact</small>
                </TableCell>
                <TableCell component={"td"}>
                  <small>
                    <Link href={`tel:${student.nextOfKinPhoneNumber}`}>
                      {student.nextOfKinPhoneNumber}
                    </Link>
                  </small>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component={"th"}>
                  <small>Relationship</small>
                </TableCell>
                <TableCell component={"td"}>
                  <small>{student.nextOfKinRelationship}</small>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Box>
      <Box
        component={Paper}
        sx={{
          marginLeft: "0.5em",
          width: "100dvw",
          display: "flex",
          gap: "0.5em",
        }}
      >
        <Box
          sx={{
            marginLeft: "0.5em",
            width: "50%",
            display: "flex",
            justifyContent: "center",
            padding: "0.5em",
          }}
        >
          <Typography variant="body2" paragraph>
            Medical History
          </Typography>
          <Box component={Paper}></Box>
        </Box>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            padding: "0.5em",
          }}
        >
          <Box sx={{ maxHeight: "50%" }}>
            <Typography variant="body2" paragraph>
              Medication
            </Typography>
            <Box>
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
                {student.medication.length > 0 && (
                  <TableBody>
                    {student.medication.map((drug, index) => (
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
            </Box>
          </Box>
          <Box>
            <Typography variant="body2" paragraph>
              Special Conditions
            </Typography>
            <Box sx={{ maxHeight: "50%" }}>
              <Table
                sx={{ width: "100%", overflowY: "auto", maxHeight: "inherit" }}
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
                  {student.specialConditions.length > 0 &&
                    student.specialConditions.map((condition, index) => (
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
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PatientDetails;
