import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { SelectButton } from "../links";

const useStyles = makeStyles(() => {
  return {
    root: {
      flexGrow: 1
    }
  };
});

export function SelectInput({ label, id, name, logicKey, handleChange, value }) {
  const classes = useStyles();

  return (
    <Grid container direction="row" alignItems="flex-end" justify="flex-start">
      <Grid item className={classes.root}>
        <FormControl margin="normal" fullWidth>
          <TextField id={id} name={id} label={label} type="readonly" value={name} />
        </FormControl>
      </Grid>
      <Grid item>
        <Box pb={1} pl={1}>
          <SelectButton label={label} logicKey={logicKey} handleChange={handleChange} value={value} aria="Select">
            Select
          </SelectButton>
        </Box>
      </Grid>
    </Grid>
  );
}

SelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  logicKey: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string
};
