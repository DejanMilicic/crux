import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

export function ShortTimeFormat({ date }) {
  return (
    <Typography variant="body1" color="textSecondary">
      {new Intl.DateTimeFormat("en-GB", {
        hour12: true,
        hour: "numeric",
        minute: "numeric"
      }).format(new Date(date))}
    </Typography>
  );
}

ShortTimeFormat.propTypes = {
  date: PropTypes.string.isRequired
};
