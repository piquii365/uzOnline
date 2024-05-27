import { Close } from "@mui/icons-material";
import {
  Modal,
  Box,
  Stack,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
} from "@mui/material";
import * as React from "react";

const PatientHistory: React.FC = ({ card, open, handleClose }) => {
  const patient = card;
  return (
    <Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          component={Paper}
          sx={{
            overflowY: "scroll",
            maxHeight: "90dvh",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
            padding: "0.5em",
            width: "30em",
            borderRadius: "5px",
          }}
        >
          {patient?.visit?.map((visit, index) => (
            <Box key={index}>
              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0.5em",
                  backgroundColor: "#293855",
                  color: "white",
                }}
              >
                <Typography variant="body1" paragraph>
                  DATE:{new Date(visit.date).toDateString()}
                </Typography>
                <Typography variant="body1" paragraph>
                  TEMP:{visit.temp}
                </Typography>
                <Typography variant="body1" paragraph>
                  BLOOD PRESSURE:{visit.BP}
                </Typography>
                <IconButton
                  sx={{ position: "absolute", top: 0, right: 0 }}
                  onClick={handleClose}
                >
                  <Close />
                </IconButton>
              </Stack>
              <Box component={Paper} sx={{ padding: "0.5em" }}>
                <Typography variant="body1" paragraph>
                  Medical History
                </Typography>
                <Box>
                  <Typography variant="body1" paragraph color="red">
                    Condition for Visit
                  </Typography>
                  <List>
                    {visit?.purposeOfVisit.length > 0 ? (
                      visit?.purposeOfVisit?.map((purpose, index) => (
                        <ListItem key={index}>
                          <ListItemText>{purpose}</ListItemText>
                        </ListItem>
                      ))
                    ) : (
                      <Typography color="red" variant="body2" paragraph>
                        Condition for Visit
                      </Typography>
                    )}
                  </List>
                </Box>
                <Box>
                  <Typography variant="body2" color="red" paragraph>
                    Prescription
                  </Typography>
                  <List>
                    {visit?.prescription.length > 0 ? (
                      visit?.purposeOfVisit?.map((drug, index) => (
                        <ListItem key={index}>
                          <ListItemText>{drug}</ListItemText>
                        </ListItem>
                      ))
                    ) : (
                      <Typography color="red" variant="body2" paragraph>
                        Cannot Get Prescription
                      </Typography>
                    )}
                  </List>
                </Box>
                <Box>
                  <Typography variant="body2" color="red" paragraph>
                    Drugs Received
                  </Typography>
                  <List>
                    {visit?.collectedDrugs?.drugs?.length > 0 ? (
                      visit?.collectedDrugs?.drugs?.map((drug, index) => (
                        <ListItem key={index}>
                          <ListItemText>{drug}</ListItemText>
                        </ListItem>
                      ))
                    ) : (
                      <Typography color="red" variant="body2" paragraph>
                        Cannot Get Prescription
                      </Typography>
                    )}
                  </List>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Modal>
    </Box>
  );
};

export default PatientHistory;
