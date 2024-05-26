import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Button,
  Checkbox,
} from "@mui/material";
import * as React from "react";
import { useLocation, useParams } from "react-router-dom";

const Card: React.FC = () => {
  const { regNumber } = useParams();
  const { state } = useLocation();
  const [checked, setChecked] = React.useState([]);
  const handleChange = (value) => () => {
    if (checked.includes(value)) {
      setChecked(checked.splice(checked.indexOf(value), 1));
    } else {
      setChecked(checked.push(value));
    }
    console.log(checked);
  };

  const currentCard = state.visit.find((card) => {
    return card._id == state.currentCard;
  });
  return (
    <Box
      sx={{
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
            {currentCard ? new Date(currentCard.date).toDateString() : null}
          </Typography>
          <Typography
            color={currentCard?.temp >= 37 ? "red" : "inherit"}
            variant="body2"
            paragraph
          >
            Temp:
            {currentCard ? currentCard.temp : null}
          </Typography>
          <Typography variant="body2" paragraph>
            BP:
            {currentCard ? currentCard.BP : null}
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
              sx={{
                bgcolor: "#4741A6",
                color: "white",
                "&:hover": { bgcolor: "#9bbbfc", color: "white" },
              }}
              size="small"
            >
              Prescribe All
            </Button>
          </Box>
        </Box>
      </Box>
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
          Prescribed Drugs appear here{" "}
        </Typography>
      </Box>
    </Box>
  );
};

export default Card;
