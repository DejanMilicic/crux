import React, { useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import { Email, FormStatus } from "components/inputs";
import { postForgot, selectUser, UserStore } from "stores/user";
import { ForgetLink } from "./ForgetLink";
import { LoginButton } from "./loginButton";

export function Forgot() {
  const { dispatchUser, statusUser } = selectUser(useContext(UserStore));

  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (validateForm()) {
      postForgot(dispatchUser, {
        email: email
      });
    }
  }

  function validateForm() {
    return email;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" alignItems="center">
        <Icon fontSize="large">lock</Icon>
        <Typography variant="h4" color="inherit">
          Forgot Password?
        </Typography>
      </Grid>
      <Grid container direction="column" alignItems="center">
        <Email handleChange={setEmail} email={email} id="email" label="enter reset email" autoFocus required />
        <LoginButton handleValidation={validateForm}>Start Reset</LoginButton>
        <ForgetLink>Cancel Reset</ForgetLink>
        <FormStatus status={statusUser} />
      </Grid>
    </form>
  );
}
