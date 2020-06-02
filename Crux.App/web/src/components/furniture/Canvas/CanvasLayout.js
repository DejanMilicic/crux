import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { CanvasHead } from "./CanvasHead";

export function CanvasLayout({ title, icon, width, children }) {
  return (
    <Container maxWidth={width}>
      <Box pt={1} display="flex" flexDirection="column" alignItems="center">
        <Paper>
          <CanvasHead icon={icon}>{title}</CanvasHead>
           <Box p={{ xs: 1, sm: 2 }}>{children}</Box>
        </Paper>
      </Box>
    </Container>
  );
}

CanvasLayout.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  width: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
