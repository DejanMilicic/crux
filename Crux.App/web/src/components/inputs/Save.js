import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

export function Save({ disabled, children }) {
  return (
    <Box pl={1}>
      <Button type="submit" variant="outlined" color="primary" disabled={disabled}>
        <Box height={22}>{children}</Box>
      </Button>
    </Box>
  );
}

Save.propTypes = {
  disabled: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
