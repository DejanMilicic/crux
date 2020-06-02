import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { BackIcon } from "components/links";

const useStyles = makeStyles(theme => {
  return {
    header: {
      color: "white",
      backgroundColor: theme.palette.primary.main
    }
  };
});

export function CanvasHead({ children }) {
  const classes = useStyles();

  return (
    <Box p={2} className={classes.header}>
      <Grid container direction="column">
        <Grid container direction="row" justify="space-between" alignItems="center" className={classes.header}>
          <Typography variant="h6">{children}</Typography>
          <BackIcon />
        </Grid>
      </Grid>
    </Box>
  );
}

CanvasHead.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
