import React, { useContext } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { setConfig, UserStore } from "stores/user";

export default function StepNav({ handleStep, step, total }) {
  const { dispatchUser } = useContext(UserStore);

  function handleFinish() {
    setConfig(dispatchUser, { key: "HASINTRO", value: true });
  }

  return (
    <Box p={{ xs: 1, sm: 1 }}>
      <Grid container direction="column" alignItems="center">
        <Box>
          <Typography variant="body1" color="textSecondary">
            Step {step}
          </Typography>
        </Box>
        <Box>
          <Grid container direction="row">
            {step > 1 ? <Button onClick={() => handleStep(step - 1)}>Back</Button> : null}
            {step < total ? <Button onClick={() => handleFinish()}>Skip this Intro</Button> : <Button onClick={() => handleFinish()}>Finish</Button>}
            {step < total ? <Button onClick={() => handleStep(step + 1)}>Next</Button> : null}
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}

StepNav.propTypes = {};
