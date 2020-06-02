import React, { useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import { Pwd, FormStatus } from "components/inputs";
import { postReset, selectUser, UserStore } from "stores/user";
import { LoginButton } from "./loginButton";
import { ForgetLink } from "./ForgetLink";

export function Reset() {
  const { dispatchUser, forgot, statusUser } = selectUser(useContext(UserStore));

  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (validateForm()) {
      postReset(dispatchUser, {
        resetPassword: pwd,
        email: forgot.email,
        code: forgot.code,
        resetCode: forgot.reset
      });
    }
  }

  function validateForm() {
    return pwd && confirm && pwd === confirm;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" alignItems="center">
        <Icon fontSize="large">lock</Icon>
        <Typography variant="h4" color="inherit">
          Reset Password
        </Typography>
      </Grid>
      <Grid container direction="column" alignItems="center">
        <Pwd handleChange={setPwd} pwd={pwd} id="password" label="new password" autoFocus required />
        <Pwd handleChange={setConfirm} pwd={confirm} id="confirm" label="confirm password" required />
        <LoginButton handleValidation={validateForm}>Complete Change</LoginButton>
        <ForgetLink email={forgot.email}>Cancel Reset</ForgetLink>
        <FormStatus status={statusUser} />
      </Grid>
    </form>
  );
}
