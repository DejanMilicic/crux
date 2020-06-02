import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

export function Cancel({ dispatch, callback, isDialog }) {
  function handleCancel(e) {
    e.preventDefault();
    window.history.back();
  }

  function handleClose(e) {
    e.preventDefault();
    callback(dispatch);
  }

  return isDialog ? (
    <Button
      aria-label="cancel"
      variant="contained"
      color="secondary"
      onClick={handleClose}
    >
      <Box width={60}>Cancel</Box>
    </Button>
  ) : (
    <Button
      aria-label="cancel"
      variant="contained"
      color="secondary"
      onClick={handleCancel}
    >
      <Box width={60}>Cancel</Box>
    </Button>
  );
}

Cancel.propTypes = {
  dispatch: PropTypes.func,
  callback: PropTypes.func,
  isDialog: PropTypes.bool
};
