import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export function DashTitle({ children }) {
  return (
    <Fragment>
      <Box p={2}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item>
            <Typography variant="h4" color="textSecondary">
              {children}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />
    </Fragment>
  );
}

DashTitle.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
