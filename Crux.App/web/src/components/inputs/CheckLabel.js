import React from "react";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export function CheckLabel({ label, id, value, handleChange }) {
  return (
    <FormControl margin="normal">
      <FormControlLabel label={label} control={<Checkbox id={id} name={id} label={label} onChange={e => handleChange(e.target.checked)} checked={value} />} />
    </FormControl>
  );
}

CheckLabel.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.bool,
  handleChange: PropTypes.func.isRequired
};
