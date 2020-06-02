import React from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import { DatePicker, TimePicker } from "@material-ui/pickers";

export function DateTime({ label, id, value, handleChange, required }) {
  return (
    <Grid container direction="column" alignItems="center">
      <FormControl margin="normal" fullWidth>
        <DatePicker
          onChange={handleChange}
          value={new Date(value)}
          id={id + "Date"}
          name={id + "Date"}
          label={label + " Date"}
          required={required}
          disablePast
        />
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <TimePicker
          onChange={handleChange}
          value={new Date(value)}
          id={id + "Time"}
          name={id + "Time"}
          label={label + " Time"}
          required={required}
          disablePast
        />
      </FormControl>
    </Grid>
  );
}

DateTime.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  required: PropTypes.bool
};
