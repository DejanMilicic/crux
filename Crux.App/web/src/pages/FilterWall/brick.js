import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

export function Brick({ children }) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" m={1} pb={2}>
      <Paper>
        <Box width={275} p={1}>
          {children}
        </Box>
      </Paper>
    </Box>
  );
}

Brick.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
