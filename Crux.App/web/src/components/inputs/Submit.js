import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

export function Submit({ disabled, children }) {
  return (
    <Box pr={1}>
      <Button aria-label="submit" type="submit" variant="contained" color="primary" disabled={disabled}>
        <Box width={60}>{children}</Box>
      </Button>
    </Box>
  );
}

Submit.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
