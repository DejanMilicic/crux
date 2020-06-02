import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export function ProfileButton({ handleClick, children }) {
  return (
    <Button size="small" variant="outlined" color="primary" aria-label="Select Profile" onClick={handleClick}>
      <Box px={2}>
        <Typography variant="caption">{children}</Typography>
      </Box>
    </Button>
  );
}

ProfileButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
