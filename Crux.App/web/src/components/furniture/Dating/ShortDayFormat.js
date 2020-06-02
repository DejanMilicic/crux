import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

export function ShortDayFormat({ date }) {
  return (
    <Typography variant="subtitle2" color="textPrimary">
      {new Intl.DateTimeFormat("en-GB", {
        month: "2-digit",
        day: "2-digit"
      }).format(new Date(date))}
    </Typography>
  );
}

ShortDayFormat.propTypes = {
  date: PropTypes.string.isRequired
};
