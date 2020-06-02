import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

export default function DocFull({ fullUrl, name }) {
  return (
    <Grid container direction="column" alignItems="center">
      <Box p={1}>
        <img src={fullUrl} alt={name} width={500} />
      </Box>
    </Grid>
  );
}

DocFull.propTypes = {
  fullUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
