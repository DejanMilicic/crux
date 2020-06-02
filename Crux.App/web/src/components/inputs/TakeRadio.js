import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";

export function TakeRadio({ value, handleChange }) {
  function handleSubmit(e, value) {
    e.preventDefault();
    handleChange(value);
  }

  return (
    <FormControl margin="normal">
      <Typography variant="body1" color="textSecondary">
        Default List Length
      </Typography>
      <RadioGroup id="takeDefault" aria-label="List Length" label="List Length" name="takeDefault" value={value.toString()} onChange={handleSubmit}>
        <Grid container direction="row" alignItems="flex-start">
          <FormControlLabel value="10" control={<Radio />} label="10" />
          <FormControlLabel value="25" control={<Radio />} label="25" />
          <FormControlLabel value="50" control={<Radio />} label="50" />
          <FormControlLabel value="100" control={<Radio />} label="100" />
        </Grid>
      </RadioGroup>
    </FormControl>
  );
}

TakeRadio.propTypes = {
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired
};
