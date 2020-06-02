import React, { useState, useContext } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import { ShortText, FormStatus } from "components/inputs";
import { postTwoFactor, selectUser, UserStore } from "stores/user";
import { LoginButton } from "./loginButton";

export function TwoFactor() {
  const { dispatchUser, user, statusUser } = selectUser(useContext(UserStore));

  const [reply, setReply] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (validateForm()) {
      postTwoFactor(dispatchUser, {
        id: user.id,
        auth: reply
      });
    }
  }

  function validateForm() {
    return reply && reply.length > 5;
  }

  return (
    <Container maxWidth="sm">
      <Box p={1}>
        <Paper>
          <Box p={{ xs: 2, sm: 4 }}>
            <form onSubmit={handleSubmit}>
              <Grid container direction="column" alignItems="center">
                <Icon fontSize="large">lock</Icon>
                <Typography variant="h4" color="inherit">
                  Enter Code
                </Typography>
              </Grid>
              <Grid container direction="column" alignItems="center">
                <ShortText handleChange={setReply} value={reply} id="reply" label="authorisation code" autoFocus required />
                <LoginButton handleValidation={validateForm}>Submit Validation</LoginButton>
                <FormStatus status={statusUser} />
              </Grid>
            </form>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
