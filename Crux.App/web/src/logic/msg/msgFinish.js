import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

export default function MsgFinish() {
  return (
    <Box p={3} display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h6" color="textSecondary">
        The Message has been sent
      </Typography>
    </Box>
  );
}
