import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { FormSubmit, Pwd } from "components/inputs";

export function PasswordInput({ dispatch, callback, handleReset, isDialog }) {
  const [current, setCurrent] = useState("");
  const [replacement, setReplacement] = useState("");
  const [replacementMatch, setReplacementMatch] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (validateForm()) {
      handleReset(current, replacement);
    }
  }

  function validateForm() {
    return replacement.length > 0 && replacement === replacementMatch;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      <Typography variant="body1" color="textSecondary">
        Please confirm your new password details
      </Typography>
      <form onSubmit={handleSubmit}>
        <Pwd
          id="current"
          label="Current Password"
          value={current}
          handleChange={setCurrent}
        />
        <Pwd
          id="replacement"
          label="New Password"
          value={replacement}
          handleChange={setReplacement}
        />
        <Pwd
          id="replacementMatch"
          label="Confirm Password"
          value={replacementMatch}
          handleChange={setReplacementMatch}
        />
        <Box pt={2}>
          <FormSubmit
            disabled={!validateForm()}
            callback={callback}
            dispatch={dispatch}
            isDialog={isDialog}
          />
        </Box>
      </form>
    </Box>
  );
}

PasswordInput.propTypes = {
  callback: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  isDialog: PropTypes.bool.isRequired
};
