import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { DashHead } from "components/furniture";

export function LineDisplay({ title, children }) {
  return (
    <Box p={1}>
      <Paper>
        <DashHead>{title}</DashHead>
        <Grid container direction="column" alignItems="center" justify="center">
          <Box p={2}>{children}</Box>
        </Grid>
      </Paper>
    </Box>
  );
}

LineDisplay.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
