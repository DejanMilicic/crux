import React, { useState } from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";

export function Email({ label, id, value, handleChange, required }) {
  const [error, setError] = useState("");

  function handle(e) {
    e.preventDefault();
    handleChange(e.target.value);

    if (!e.target.value && required) {
      setError("email is required");
    } else if (!validateEmail(e.target.value)) {
      setError("email is not a valid format");
    } else {
      setError("");
    }
  }

  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  return (
    <FormControl margin="normal" fullWidth>
      <TextField
        id={id}
        name={id}
        label={label}
        type="email"
        autoComplete="email"
        onChange={handle}
        onBlur={handle}
        value={value}
        required={required}
      />
      {error ? (
        <FormHelperText id={id + "Error"}>{error}</FormHelperText>
      ) : null}
    </FormControl>
  );
}

Email.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  required: PropTypes.bool
};
