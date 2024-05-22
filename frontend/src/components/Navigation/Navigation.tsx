import { Stack, Link, Button } from "@mui/material";
import React from "react";

const Navigation = () => {
  return (
    <Stack direction={"row"}>
      <Button size="small" component={Link}>
        Doctors
      </Button>
      <Button size="small" component={Link}>
        Dispensary
      </Button>
      <Button size="small" component={Link}>
        Drugs
      </Button>
      <Button size="small" component={Link}>
        Doctors
      </Button>
      <Button size="small" component={Link}>
        Doctors
      </Button>
      <Button size="small" component={Link}>
        Doctors
      </Button>
    </Stack>
  );
};

export default Navigation;
