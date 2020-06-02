import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

export function LongDateFormat({ date, variant = "body1", color = "textSecondary" }) {
  return (
    <Typography variant={variant} color={color}>
      {new Intl.DateTimeFormat("en-GB", {
        hour12: true,
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
      }).format(new Date(date))}
    </Typography>
  );
}

LongDateFormat.propTypes = {
  date: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
};
