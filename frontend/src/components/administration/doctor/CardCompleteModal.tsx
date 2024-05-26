import { Close } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Modal,
  Typography,
  Button,
  Link,
} from "@mui/material";
import * as React from "react";

const CardCompleteModal: Reat.FC = ({ card, open, handleClose }) => {
  return (
    <Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
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
          <IconButton
            sx={{ position: "absolute", top: 0, right: 0 }}
            onClick={handleClose}
            size="small"
          >
            <Close />
          </IconButton>
          <Typography variant="body1" paragraph>
            Card Complete
          </Typography>
          <Divider />
          <Box>
            <Typography color="#1A1A1A">A Medical Diagnostic For:</Typography>
            <Box>
              {card?.purposeOfVisit?.map((condition, index) => (
                <Typography color="red" variant="body2" key={index} paragraph>
                  {condition}
                </Typography>
              ))}
            </Box>
          </Box>
          <Divider />
          <Box>
            <Typography color="#1A1A1A">Prescription</Typography>
            <Box>
              {card?.prescription?.map((drugs, index) => (
                <Typography color="green" variant="body2" key={index} paragraph>
                  {drugs}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "0.5em" }}>
            <Button size="small" fullWidth>
              Set Appointment
            </Button>
            <Button
              sx={{
                bgcolor: "#1A1A1A",
                color: "white",
                "&:hover": { border: "1px solid #293855", color: "#1a1a1a" },
              }}
              href="/doctor"
              component={Link}
              size="small"
              fullWidth
            >
              Home
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default CardCompleteModal;
