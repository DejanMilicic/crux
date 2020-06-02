import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { Submit, Cancel } from "components/inputs";

export function QuerySubmit({ dispatch, callback, isDialog, disabled }) {
  return (
    <Box pt={2}>
      <Grid container direction="row" justify="space-around">
        <Submit id="searchSubmit" disabled={disabled}>
          Search
        </Submit>
        <Cancel id="searchCancel" dispatch={dispatch} callback={callback} isDialog={isDialog} />
      </Grid>
    </Box>
  );
}

QuerySubmit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  callback: PropTypes.func.isRequired,
  isDialog: PropTypes.bool,
  disabled: PropTypes.bool
};
