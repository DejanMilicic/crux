import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { DashTitle } from "components/furniture";

export default function Step2() {
  return (
    <Box p={1}>
      <DashTitle>...then can we ask that you...</DashTitle>
      <Box p={{ xs: 1, sm: 2 }}>
        <Grid container direction="column" alignItems="center">
          <Box p={4}>
            <Typography variant="body1" color="textSecondary">
              Fill in your phone and secure Two Factor auth
            </Typography>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}

Step2.propTypes = {};
