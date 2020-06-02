import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";

export function ViewRadio({ value, handleChange }) {
  function handleSubmit(e, value) {
    e.preventDefault();
    handleChange(value);
  }

  return (
    <FormControl margin="normal">
      <Typography variant="body1" color="textSecondary">
        Default List View
      </Typography>
      <RadioGroup
        id="templateView"
        aria-label="List View"
        label="Template View"
        name="templateView"
        value={value}
        onChange={handleSubmit}
      >
        <Grid container direction="row" alignItems="flex-start">
          <FormControlLabel value="table" control={<Radio />} label="List" />
          <FormControlLabel value="wall" control={<Radio />} label="Wall" />
        </Grid>
      </RadioGroup>
    </FormControl>
  );
}

ViewRadio.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};
