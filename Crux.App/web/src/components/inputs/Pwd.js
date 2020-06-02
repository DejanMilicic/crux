import React, { useState } from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";

export function Pwd({ label, id, value, handleChange, required }) {
  const [error, setError] = useState("");

  function handle(e) {
    e.preventDefault();
    handleChange(e.target.value);

    if (!e.target.value && required) {
      setError("password is required");
    } else {
      setError("");
    }
  }

  return (
    <FormControl margin="normal" fullWidth>
      <TextField
        id={id}
        label={label}
        type="password"
        value={value}
        autoComplete="current-password"
        onChange={handle}
        onBlur={handle}
        required={required}
      />
      {error ? <FormHelperText error>{error}</FormHelperText> : null}
    </FormControl>
  );
}

Pwd.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  required: PropTypes.bool
};
