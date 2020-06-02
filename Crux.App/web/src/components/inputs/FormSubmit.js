import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { Submit, Cancel } from "../inputs";

export function FormSubmit({ dispatch, callback, isDialog, disabled }) {
  return (
    <Box pt={2}>
      <Grid container direction="row">
        <Submit disabled={disabled}>Save</Submit>
        <Cancel dispatch={dispatch} callback={callback} isDialog={isDialog} />
      </Grid>
    </Box>
  );
}

FormSubmit.propTypes = {
  dispatch: PropTypes.func,
  callback: PropTypes.func,
  isDialog: PropTypes.bool,
  disabled: PropTypes.bool.isRequired
};
