import React from "react";
import PropTypes from "prop-types";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export function SwitchLabel({ label, id, value, handleChange, required, disabled }) {
  return (
    <FormControl>
      <FormControlLabel label={label} control={<Switch id={id} name={id} label={label} onChange={e => handleChange(e.target.checked)} checked={value} required={required} disabled={disabled} />} />
    </FormControl>
  );
}

SwitchLabel.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool
};
