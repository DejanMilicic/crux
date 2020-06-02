import React, { useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import { ShortText, FormStatus } from "components/inputs";
import { postReply, selectUser, UserStore } from "stores/user";
import { LoginButton } from "./loginButton";
import { ForgetLink } from "./ForgetLink";

export function Reply() {
  const { dispatchUser, forgot, statusUser } = selectUser(useContext(UserStore));

  const [reply, setReply] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (validateForm()) {
      postReply(dispatchUser, {
        resetAuth: reply,
        email: forgot.email,
        code: forgot.code,
      });
    }
  }

  function validateForm() {
    return reply;
  }

  return (
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
        <ForgetLink email={forgot.email}>Cancel Reset</ForgetLink>
        <FormStatus status={statusUser} />
      </Grid>
    </form>
  );
}
