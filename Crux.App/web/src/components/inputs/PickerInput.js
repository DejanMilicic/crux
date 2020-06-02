import React from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { PickerButton } from "components/links";
import { ChipDisplay } from "./ChipDisplay";

export function PickerInput({ logicKey, label, value, handleChange, immediateHandle, required }) {
  return (
    <FormControl margin="normal" fullWidth>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Typography variant={value.length > 0 ? "caption" : "body1"} color="textSecondary">
          {label}
          {required ? " *" : null}
        </Typography>
        <PickerButton aria={label} logicKey={logicKey} immediateHandle={immediateHandle} handleChange={handleChange} value={value} label={label}>
          Select
        </PickerButton>
      </Grid>
      <Grid container direction="row">
        <ChipDisplay logicKey={logicKey} value={value} handleChange={handleChange} />
      </Grid>
    </FormControl>
  );
}

PickerInput.propTypes = {
  logicKey: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  immediateHandle: PropTypes.bool.isRequired,
  required: PropTypes.bool
};
