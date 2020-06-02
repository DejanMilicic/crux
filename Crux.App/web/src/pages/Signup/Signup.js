import React, { useState, useContext, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { navigate } from "@reach/router";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { DashTitle } from "components/furniture";
import { Email, Pwd, ShortText, FormStatus } from "components/inputs";
import { postSignup, postEntry, selectUser, UserStore } from "stores/user";
import { SignupButton } from "./signupButton";

export function Signup({ entryKey }) {
  const { dispatchUser, signup, statusUser } = selectUser(useContext(UserStore));

  const spring = useSpring({ config: { duration: 750 }, opacity: 1, from: { opacity: 0 } });

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [tenantName, setTenantName] = useState("");

  useEffect(() => {
    if (statusUser.isAuth) {
      navigate("/");
    }
  }, [dispatchUser, statusUser]);

  useEffect(() => {
    if (entryKey && !signup.entryKey && statusUser.isReady) {
      postEntry(dispatchUser, { entryKey });
    }

    if (signup.entryKey && signup.tenantId !== tenantId) {
      setTenantId(signup.tenantId);
      setTenantName(signup.tenantName);
    }
  }, [dispatchUser, signup, statusUser, entryKey, tenantId]);

  function handleSubmit(e) {
    e.preventDefault();

    if (validateForm()) {
      postSignup(dispatchUser, {
        email: email,
        name: name,
        pwd: pwd,
        tenantName: tenantName,
        tenantId: tenantId,
      });
    }
  }

  function validateForm() {
    return email && pwd && name && tenantName;
  }

  return (
    <animated.div style={spring}>
      <Container maxWidth="sm">
        <Box p={1}>
          <DashTitle>Signup</DashTitle>
          <Paper>
            <Box p={{ xs: 2, sm: 4 }}>
              <form onSubmit={handleSubmit}>
                <Grid container direction="column" alignItems="center">
                  <Email handleChange={setEmail} value={email} id="email" label="your email" autoFocus required />
                  <Pwd handleChange={setPwd} value={pwd} id="pwd" label="your password" required />
                  <ShortText handleChange={setName} value={name} id="name" label="your name" required />
                  {tenantId ? (
                    <Box p={1}>
                      <Typography variant="body1" color="textSecondary">
                        You will be added to the {tenantName} organisation
                      </Typography>
                    </Box>
                  ) : (
                    <ShortText handleChange={setTenantName} value={tenantName} id="tenant" label="your new organisation" />
                  )}
                  <SignupButton handleValidation={validateForm}>Signup Now</SignupButton>
                  <FormStatus status={statusUser} />
                </Grid>
              </form>
            </Box>
          </Paper>
        </Box>
      </Container>
    </animated.div>
  );
}
