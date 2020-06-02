import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

export function FormStatus({ status }) {
  return status && (status.isLoading || status.isFailed) ? (
    <Box p={1}>
      <Typography variant="caption" color="textPrimary">
        {status.loadedText}
      </Typography>
    </Box>
  ) : null;
}

FormStatus.propTypes = {
  status: PropTypes.shape({
    isLoading: PropTypes.bool,
    isFailed: PropTypes.bool,
    loadedText: PropTypes.string
  })
};
