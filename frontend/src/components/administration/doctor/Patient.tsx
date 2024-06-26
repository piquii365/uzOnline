import {
  Box,
  Stack,
  styled,
  Button,
  ButtonGroup,
  Badge,
  Typography,
  Divider,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableHead,
} from "@mui/material";
import Card from "./Card.tsx";
import { axiosPrivate } from "../../../api/axios.js";
import * as React from "react";
import { useLocation } from "react-router-dom";
import PatientHistory from "./PatientHistory.tsx";

const NavButton = styled(Button)({
  display: "flex",
  justifyContent: "start",
  border: "none",
  borderRadius: 0,
  color: "#293855",
  "&:hover": { backgroundColor: "gray", border: "none" },
});
const Patient = () => {
  const [patient, setPatient] = React.useState({
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
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState({});
  const { state: id } = useLocation();
  const [card, setCard] = React.useState({});
  const [result, setResult] = React.useState("");
  const fetchPatient = React.useCallback(async () => {
    const response = await axiosPrivate.get(`/patient/current/${id}`);
    if (response.data.registered) {
      setPatient({
        ...patient,
        fullName: response.data.patient.fullName,
        regNumber: response.data.patient.regNumber,

        physicalAddress:
          response.data.patient.address !== undefined
            ? response.data.patient.address
            : "Not Provided",
        specialConditions: response.data.patient.specialConditions,
        medication: response.data.patient.medication,
        medicalHistory: response.data.patient.medicalHistory,
        gender: response.data.patient.gender,
        nextOfKin:
          response.data.patient.nextOfKin?.name !== undefined
            ? response.data.patient.nextOfKin.name
            : "Not Provided",
        nextOfKinAddress:
          response.data.patient.nextOfKin?.address !== undefined
            ? response.data.patient.nextOfKin.address
            : "Not Provided",
        nextOfKinRelationship:
          response.data.patient.nextOfKin?.relationship !== undefined
            ? response.data.patient.nextOfKin.relationship
            : "Not Provided",
        nextOfKinPhoneNumber:
          response.data.patient.nextOfKin?.phoneNumber !== undefined
            ? response.data.patient.nextOfKin.phoneNumber
            : "Not Provided",
      });
      console.log(response.data);
    } else {
      console.log(response.data);
      setResult("Patient not registered");
    }
  }, []);
  const fetchCard = React.useCallback(async () => {
    const response = await axiosPrivate.get(`/patient/card/${id}`);
    if (response.data.registered) {
      setCard(response.data.card);
    } else {
      setResult("Patient not registered");
    }
    console.log(response.data.card);
  }, []);
  React.useEffect(() => {
    fetchPatient();
    fetchCard();
  }, [fetchPatient, fetchCard]);
  const currentCard = card?.visit?.find((cardItem) => {
    return cardItem._id === card.currentCard;
  });
  const handleOpen = (card) => {
    setSelected(card);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const openCard = () => {
    handleOpen(card);
  };
  return (
    <>
      {patient !== null || undefined ? (
        <Box sx={{ display: "flex", width: "100%" }}>
          <Stack sx={{ width: "17em", height: "inherit", paddingTop: "1em" }}>
            <Typography sx={{ marginLeft: "0.5em" }} variant="body1" paragraph>
              {patient?.regNumber}
            </Typography>

            <ButtonGroup
              sx={{ display: "flex", flexDirection: "column", gap: "0.5em" }}
            >
              <Badge badgeContent={patient?.specialConditions?.length}>
                <NavButton href="#specialConditions" fullWidth size="small">
                  Special Conditions
                </NavButton>
              </Badge>
              <Badge badgeContent={patient?.medicalHistory?.length}>
                <NavButton href="#history" fullWidth size="small">
                  History
                </NavButton>
              </Badge>
              <Badge badgeContent={patient?.medication?.length}>
                <NavButton href="#medication" fullWidth size="small">
                  Medication
                </NavButton>
              </Badge>
              <Badge badgeContent={patient?.appointments?.length}>
                <NavButton href="#appointments" fullWidth size="small">
                  Appointments
                </NavButton>
              </Badge>
            </ButtonGroup>
            <Divider />
            <Typography sx={{ marginLeft: "0.5em" }} variant="body1" paragraph>
              Actions
            </Typography>
            <ButtonGroup
              sx={{ display: "flex", flexDirection: "column", gap: "0.5em" }}
            >
              <NavButton href="#notes" size="small" fullWidth>
                Write Notes
              </NavButton>
              <NavButton href="#prescription" size="small" fullWidth>
                Write Prescription
              </NavButton>
            </ButtonGroup>
          </Stack>
          <Box
            sx={{
              display: "flex",
              width: "inherit",
              justifyContent: "center",
              padding: "0.5em 2em",
              marginLeft: "0.5em",
              maxHeight: "inherit",
            }}
          >
            <Box
              sx={{
                width: "100%",
                padding: "0.5em",
                maxHeight: "80dvh",
                overflowY: "scroll",
              }}
            >
              <Box
                component={Paper}
                sx={{ padding: "0.5em", marginBottom: "1em" }}
              >
                <Typography
                  sx={{
                    padding: "0.5em",
                    width: "inherit",
                    backgroundColor: "#293855",
                    color: "white",
                  }}
                  paragraph
                >
                  Patient Information
                </Typography>
                <Box>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ border: "none" }} component={"th"}>
                          Full Name
                        </TableCell>
                        <TableCell sx={{ border: "none" }} component={"td"}>
                          {patient?.fullName}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component={"th"}>Gender</TableCell>
                        <TableCell component={"td"}>
                          {patient?.gender}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Box>
              <Box
                component={Paper}
                sx={{ padding: "0.5em", marginBottom: "1em" }}
              >
                <Box
                  sx={{
                    padding: "0.5em",
                    width: "inherit",
                    backgroundColor: "#293855",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography paragraph>Card</Typography>
                  <Button onClick={openCard} size="small">
                    View History
                  </Button>
                </Box>

                {patient === null || undefined ? (
                  <Typography color="red" variant="body2" paragraph>
                    {result}
                  </Typography>
                ) : (
                  <Box
                    sx={{
                      height: "fit-content",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5em",
                    }}
                  >
                    {currentCard === undefined ? (
                      <Typography>
                        Failed to load Patient Information
                      </Typography>
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography color="red" variant="body2" paragraph>
                          Date:{new Date(currentCard.date).toDateString()}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            gap: "0.5em",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            color={
                              currentCard.temp <= 35
                                ? "blue"
                                : currentCard.temp >= 37.7
                                ? "red"
                                : "green"
                            }
                          >
                            Temp:{currentCard.temp}
                          </Typography>
                          <Typography>BP:{currentCard?.BP}</Typography>
                        </Box>
                      </Box>
                    )}
                    <Card currentCard={card.currentCard} />
                    <PatientHistory
                      card={selected}
                      open={open}
                      handleClose={handleClose}
                    />
                  </Box>
                )}
              </Box>
              <Box
                component={Paper}
                sx={{ padding: "0.5em", marginBottom: "1em" }}
              >
                <Typography
                  sx={{
                    padding: "0.5em",
                    width: "inherit",
                    backgroundColor: "#293855",
                    color: "white",
                  }}
                  paragraph
                >
                  Next Of Kin
                </Typography>
                <Box>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ border: "none" }} component={"th"}>
                          Full Name
                        </TableCell>
                        <TableCell sx={{ border: "none" }} component={"td"}>
                          {patient?.nextOfKin?.name
                            ? patient?.nextOfKin?.name
                            : "Not Provided"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ border: "none" }} component={"th"}>
                          Address
                        </TableCell>
                        <TableCell sx={{ border: "none" }} component={"td"}>
                          {patient?.nextOfKin?.address
                            ? patient?.nextOfKin?.address
                            : "Not Provided"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ border: "none" }} component={"th"}>
                          Relationship
                        </TableCell>
                        <TableCell sx={{ border: "none" }} component={"td"}>
                          {patient?.nextOfKin?.relationship
                            ? patient?.nextOfKin?.relationship
                            : "Not Provided"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ border: "none" }} component={"th"}>
                          Phone Number
                        </TableCell>
                        <TableCell sx={{ border: "none" }} component={"td"}>
                          {patient?.nextOfKin?.phoneNumber
                            ? patient?.nextOfKin?.phoneNumber
                            : "Not Provided"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Box>
              <Box
                component={Paper}
                sx={{ padding: "0.5em", marginBottom: "1em" }}
              >
                <Typography
                  sx={{
                    padding: "0.5em",
                    width: "inherit",
                    backgroundColor: "#293855",
                    color: "white",
                  }}
                  paragraph
                >
                  Special Conditions
                </Typography>
                <Box>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell component={"th"}>Name</TableCell>
                        <TableCell component={"th"}>Date Received</TableCell>
                        <TableCell component={"th"}>Assigned Doctor</TableCell>
                        <TableCell component={"th"}>Medication</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {patient?.specialConditions.map((condition, index) => (
                        <TableRow key={index}>
                          <TableCell component={"td"} sx={{ border: "none" }}>
                            {condition.name}
                          </TableCell>
                          <TableCell component={"td"} sx={{ border: "none" }}>
                            {new Date(condition.dateReceived).toDateString()}
                          </TableCell>
                          <TableCell component={"td"} sx={{ border: "none" }}>
                            Not yet assigned
                          </TableCell>
                          <TableCell component={"td"} sx={{ border: "none" }}>
                            No medication assigned for this condition
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Box>
              <Box
                component={Paper}
                sx={{ padding: "0.5em", marginBottom: "1em" }}
              >
                <Typography
                  sx={{
                    padding: "0.5em",
                    width: "inherit",
                    backgroundColor: "#293855",
                    color: "white",
                  }}
                  paragraph
                >
                  Medication
                </Typography>
                <Box>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell component={"th"}>No</TableCell>
                        <TableCell component={"th"}>Name</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {patient?.medication?.map((drug, index) => (
                        <TableRow key={index}>
                          <TableCell component={"td"} sx={{ border: "none" }}>
                            {index + 1}
                          </TableCell>
                          <TableCell component={"td"} sx={{ border: "none" }}>
                            {drug.name}
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
      ) : (
        <Box>
          <Typography variant={"h3"} paragraph>
            404 PAGE NOT FOUND
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Patient;
