import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { DashHead } from "components/furniture";
import { UsagePie } from "./UsagePie";

export function UsageDisplay({ legend, usage, total, children }) {
  return (
    <Box p={1}>
      <Paper>
        <DashHead>{children}</DashHead>
        <Grid container direction="column" alignItems="center" justify="center">
          <UsagePie legend={legend} usage={usage} total={total} />
        </Grid>
      </Paper>
    </Box>
  );
}

UsageDisplay.propTypes = {
  legend: PropTypes.string.isRequired,
  usage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
