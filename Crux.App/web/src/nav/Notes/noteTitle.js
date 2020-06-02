import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

export function NoteTitle({ children }) {
  return (
    <Typography variant="h5" color="textSecondary">
      {children}
    </Typography>
  );
}

NoteTitle.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
