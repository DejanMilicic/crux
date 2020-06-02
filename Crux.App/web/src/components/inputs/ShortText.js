import React, { useState } from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";

export function ShortText({
  label,
  id,
  value,
  handleChange,
  required,
  requiredText
}) {
  const [error, setError] = useState("");

  function handle(e) {
    e.preventDefault();
    handleChange(e.target.value);

    if (!e.target.value && required) {
      setError(requiredText + " is required");
    } else {
      setError("");
    }
  }

  return (
    <FormControl margin="normal" fullWidth>
      <TextField
        id={id}
        name={id}
        label={label}
        type="input"
        onChange={handle}
        onBlur={handle}
        value={value}
        required={required}
      />
      {error ? <FormHelperText error>{error}</FormHelperText> : null}
    </FormControl>
  );
}

ShortText.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  requiredText: PropTypes.string
};
