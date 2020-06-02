import React from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import { Login, ForgetLink } from "components/furniture";
import { NavLink } from "components/links";

export function Signin() {
  return (
    <Container maxWidth="sm">
      <Box p={1}>
        <Paper>
          <Box p={{ xs: 2, sm: 4 }}>
            <Grid container direction="column" alignItems="center">
              <Icon fontSize="large">lock</Icon>
              <Typography variant="h4" color="inherit">
                Login
              </Typography>
            </Grid>
            <Login />
            <Grid container direction="row" justify="space-around" alignItems="center">
              <ForgetLink on>Forgotten your Password?</ForgetLink>
              <Typography variant="caption" color="textPrimary">
                |
              </Typography>
              <NavLink to="/signup">Signup for my own account</NavLink>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
