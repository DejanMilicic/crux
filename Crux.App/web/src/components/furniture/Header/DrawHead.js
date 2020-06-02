import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { CloseIcon } from "components/links";

export function DrawHead({ dispatch, callback, children }) {
  return (
    <Box p={2} bgcolor="primary.main" color="primary.contrastText" display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
      <Typography variant="h4">{children}</Typography>
      <CloseIcon dispatch={dispatch} callback={callback} />
    </Box>
  );
}

DrawHead.propTypes = {
  callback: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
