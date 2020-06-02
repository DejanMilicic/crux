import React, { useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import { Email, FormStatus, Pwd, CheckLabel } from "components/inputs";
import { postLogin, selectUser, UserStore } from "stores/user";
import { LoginButton } from "./loginButton";

export function Login() {
  const { dispatchUser, statusUser } = selectUser(useContext(UserStore));

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (validateForm()) {
      postLogin(dispatchUser, {
        email: email,
        pwd: pwd,
        rememberMe: rememberMe
      });
    }
  }

  function validateForm() {
    return email && pwd;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" alignItems="center">
        <Email handleChange={setEmail} value={email} id="email" label="email" autoFocus required />
        <Pwd handleChange={setPwd} value={pwd} id="pwd" label="password" required />
        <LoginButton handleValidation={validateForm}>Login</LoginButton>
        <CheckLabel id="rememberMe" handleChange={setRememberMe} value={rememberMe} label="Remember Me" />
        <FormStatus status={statusUser} />
      </Grid>
    </form>
  );
}
