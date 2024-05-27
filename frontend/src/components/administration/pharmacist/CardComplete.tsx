import { KeyboardArrowLeft } from "@mui/icons-material";
import {
  Box,
  Modal,
  Typography,
  IconButton,
  Paper,
  Button,
} from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
const CardComplete: React.FC = ({ open, handleClose }) => {
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
            width: "40dvw",
            padding: "0.5em",
          }}
        >
          <Typography>Card Complete</Typography>
          <Button onClick={handleClose} startIcon={<KeyboardArrowLeft />}>
            Go To the Home Page
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default CardComplete;
