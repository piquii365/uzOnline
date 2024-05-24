import {
  Typography,
  Box,
  Paper,
  Autocomplete,
  FormControl,
  TextField,
} from "@mui/material";
import * as React from "react";

const Card: React.FC = () => {
  const descriptions: string[] = [
    "Headache",
    "stomachache",
    "itchy wiwie",
    "gonorrhea",
  ];
  return (
    <Box
      component={Paper}
      sx={{ padding: "0.5em", height: "100%", width: "inherit" }}
    >
      <Typography>My Card Goes Here</Typography>
      <form>
        <Box component={FormControl} fullWidth>
          <Autocomplete
            fullWidth
            id="description"
            freeSolo
            multiple
            options={descriptions.map((option) => option)}
            renderInput={(params) => (
              <TextField {...params} label="Description" />
            )}
          />
        </Box>
      </form>
    </Box>
  );
};

export default Card;
