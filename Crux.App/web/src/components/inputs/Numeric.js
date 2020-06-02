import React from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

export function Numeric({ label, id, value, handleChange, required }) {
  function handleSubmit(e) {
    e.preventDefault();
    handleChange(e.target.value);
  }

  return (
    <FormControl margin="normal" fullWidth>
      <TextField
        id={id}
        label={label}
        type="number"
        onChange={handleSubmit}
        value={value}
        InputLabelProps={{
          shrink: true
        }}
        required={required}
      />
    </FormControl>
  );
}

Numeric.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  required: PropTypes.bool
};
