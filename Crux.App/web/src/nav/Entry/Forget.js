import React from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { Forgot, Reply, Reset } from "components/furniture";

export function Forget({ forgot }) {
  return (
    <Container maxWidth="sm">
      <Box p={1}>
        <Paper>
          <Box p={{ xs: 2, sm: 4 }}>{!forgot.hasCode ? <Forgot /> : !forgot.hasReply ? <Reply /> : <Reset />}</Box>
        </Paper>
      </Box>
    </Container>
  );
}

Forget.propTypes = {
  forgot: PropTypes.shape({
    hasCode: PropTypes.bool.isRequired,
    hasReply: PropTypes.bool.isRequired
  })
};
