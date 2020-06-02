import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";

export function LoginButton({ handleValidation, children }) {
  return (
    <Box p={4} minWidth="50%">
      <Button fullWidth type="submit" variant="contained" color="primary" disabled={!handleValidation()}>
        <Icon>lock_open</Icon>
        <Grid container direction="row" justify="center">
          <span>{children}</span>
        </Grid>
      </Button>
    </Box>
  );
}

LoginButton.propTypes = {
  handleValidation: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
