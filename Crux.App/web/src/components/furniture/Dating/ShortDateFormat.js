import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

export function ShortDateFormat({ date }) {
  return (
    <Typography variant="body1" color="textSecondary">
      {new Intl.DateTimeFormat("en-GB").format(new Date(date))}
    </Typography>
  );
}

ShortDateFormat.propTypes = {
  date: PropTypes.string.isRequired
};
