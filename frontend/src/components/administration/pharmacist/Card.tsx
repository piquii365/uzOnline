import { KeyboardArrowRight } from "@mui/icons-material";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Button,
} from "@mui/material";
import * as React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../../api/axios.js";
import CardComplete from "./CardComplete.js";
const Card: React.FC = () => {
  const navigate = useNavigate();
  const { regNumber } = useParams();
  const { state } = useLocation();
  const [selection, setSelection] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [checked, setChecked] = React.useState([]);
  const handleChange = (value) => () => {
    const updatedCheck = [...checked];
    if (updatedCheck.includes(value)) {
      updatedCheck.splice(updatedCheck.indexOf(value), 1);
    } else {
      updatedCheck.push(value);
    }
    setChecked(updatedCheck);
  };
  const currentCard = state.visit.find((card) => {
    return card._id == state.currentCard;
  });
  const handleComplete = () => {
    const completeCard = {
      drugs: [...checked],
      currentCard: currentCard._id,
      ownerId: regNumber,
    };
    axiosPrivate
      .put("/patient/card/complete", completeCard)
      .then((result) => {
        if (result.data.status) {
          handleOpen();
        } else {
          setMsg(result.data.Result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSelection = () => {
    if (selection) {
      setChecked([...currentCard.prescription]);
    } else {
      setChecked([]);
    }
    setSelection(!selection);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    navigate("/pharmacy");
    setOpen(false);
  };
  return (
    <>
      {currentCard === null ? (
        <Typography>Page failed to load</Typography>
      ) : (
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            width: "inherit",
            height: "center",
            justifyContent: "center",
            gap: "1em",
          }}
        >
          <Box
            sx={{
              display: "flex",
              padding: "0.5em",
              width: "35%",
              flexDirection: "column",
              height: "100%",
            }}
            component={Paper}
          >
            <Typography variant="body2" paragraph>
              Prescription for:{regNumber}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { sm: "column", md: "row", xl: "row" },
                justifyContent: {
                  sm: "start",
                  md: "space-between",
                  xl: "space-between",
                },
                width: "100%",
              }}
            >
              <Typography color="red" variant="body2" paragraph>
                Date:{" "}
                {currentCard
                  ? new Date(currentCard?.date).toDateString()
                  : null}
              </Typography>
              <Typography
                color={currentCard?.temp >= 37 ? "red" : "inherit"}
                variant="body2"
                paragraph
              >
                Temp:
                {currentCard ? currentCard?.temp : null}
              </Typography>
              <Typography variant="body2" paragraph>
                BP:
                {currentCard ? currentCard?.BP : null}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{ bgcolor: "#293855", color: "white", padding: "0.5em" }}
                variant="body2"
                paragraph
              >
                Conditions
              </Typography>

              <Box>
                <List dense>
                  {currentCard?.purposeOfVisit?.map((purpose, index) => (
                    <ListItem disablePadding key={index}>
                      <ListItemText>{purpose}</ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
            <Box>
              <Typography
                sx={{ bgcolor: "#293855", color: "white", padding: "0.5em" }}
                variant="body2"
                paragraph
              >
                Prescription
              </Typography>
              <Box>
                <List dense sx={{ margin: 0, padding: 0 }}>
                  {currentCard.prescription.map((drug, index) => (
                    <ListItem disablePadding key={index}>
                      <ListItemButton
                        onClick={handleChange(drug)}
                        sx={{ margin: 0, padding: 0 }}
                      >
                        <ListItemText>{drug}</ListItemText>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Box sx={{ display: "flex", gap: "0.5em", my: "0.5em" }}>
                <Button
                  fullWidth
                  sx={{
                    bgcolor: "#9BBBFC",
                    color: "white",
                    "&:hover": { bgcolor: "#4741A6", color: "white" },
                  }}
                  size="small"
                >
                  Exit
                </Button>
                <Button
                  fullWidth
                  sx={{
                    bgcolor: "#4741A6",
                    color: "white",
                    "&:hover": { bgcolor: "#9bbbfc", color: "white" },
                  }}
                  size="small"
                >
                  View Card History
                </Button>
                <Button
                  fullWidth
                  onClick={handleSelection}
                  sx={{
                    bgcolor: "#4741A6",
                    color: "white",
                    "&:hover": { bgcolor: "#9bbbfc", color: "white" },
                  }}
                  size="small"
                >
                  {selection ? "Select all" : "Deselect All"}
                </Button>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              padding: "0.5em",
              width: "35%",
              flexDirection: "column",
              height: "100%",
            }}
            component={Paper}
          >
            <Typography variant="body2" paragraph>
              Prescribed Drugs appear here
            </Typography>
            {msg && (
              <Typography variant="body2" color="red" paragraph>
                {msg}
              </Typography>
            )}
            <Box sx={{ position: "relative", color: "green" }}>
              <List color="green">
                {checked.length > 0 ? (
                  checked.map((item, index) => (
                    <ListItem color="green" key={index}>
                      <ListItemText>{item}</ListItemText>
                    </ListItem>
                  ))
                ) : (
                  <Typography color="red">No Drugs Selected yet</Typography>
                )}
              </List>
            </Box>
            <Button
              onClick={handleComplete}
              sx={{
                position: "absolute",
                bottom: "0.5em",
                right: "0.5em",
                color: "white",
                backgroundColor: "green",
                "&:hover": { color: "black", backgroundColor: "green" },
              }}
              endIcon={<KeyboardArrowRight />}
            >
              Complete
            </Button>
            <CardComplete open={open} handleClose={handleClose} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Card;
