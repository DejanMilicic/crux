import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { CloseIcon } from "components/links";

const useStyles = makeStyles(theme => {
  return {
    header: {
      color: "white",
      backgroundColor: theme.palette.primary.main
    }
  };
});

export function DialogHead({ dispatch, callback, children }) {
  const classes = useStyles();

  return (
    <DialogTitle id="form-dialog-title" className={classes.header}>
      <Grid container direction="column">
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.header}
        >
          <Typography variant="h6">{children}</Typography>
          <CloseIcon callback={callback} dispatch={dispatch} />
        </Grid>
      </Grid>
    </DialogTitle>
  );
}

DialogHead.propTypes = {
  callback: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
