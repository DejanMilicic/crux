import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

export function CloseIcon({ dispatch, callback }) {
  return (
    <IconButton
      color="inherit"
      onClick={() => {
        callback(dispatch);
      }}>
      <Icon>close</Icon>
    </IconButton>
  );
}

CloseIcon.propTypes = {
  dispatch: PropTypes.func.isRequired,
  callback: PropTypes.func.isRequired
};
