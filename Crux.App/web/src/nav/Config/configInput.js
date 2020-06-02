import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { SwitchLabel, TakeRadio, ViewRadio } from "components/inputs";

export function ConfigInput({ model, hasPhone, handleChange }) {
  function handleTwoFactor(value) {
    handleChange("isTwoFactor", value);
  }

  function handleEmail(value) {
    handleChange("emailNotify", value);
  }

  function handlePush(value) {
    handleChange("pushNotify", value);
  }

  function handleSms(value) {
    handleChange("smsNotify", value);
  }

  function handleTake(value) {
    handleChange("take", value);
  }

  function handleView(value) {
    handleChange("templateView", value);
  }

  return (
    <Box p={1} display="flex" flexDirection="column" alignItems="flex-start">
      <Typography variant="body1" color="textSecondary">
        Security
      </Typography>
      <SwitchLabel handleChange={handleTwoFactor} id="twoFactor" label="Enable Two Factor authentication" value={model.isTwoFactor} disabled={!hasPhone} />
      <Typography variant="body1" color="textSecondary">
        Contact Preferences
      </Typography>
      <SwitchLabel handleChange={handleEmail} id="emailNotify" label="Send me notifications by Email" value={model.emailNotify} />
      <SwitchLabel handleChange={handlePush} id="pushNotify" label="Receive push notifications" value={model.pushNotify} />
      <SwitchLabel handleChange={handleSms} id="smsNotify" label="Contact me by SMS" value={model.smsNotify} disabled={!hasPhone} />
      <TakeRadio handleChange={handleTake} value={model.take} />
      <ViewRadio handleChange={handleView} value={model.templateView} />
    </Box>
  );
}

ConfigInput.propTypes = {
  model: PropTypes.shape({
    emailNotify: PropTypes.bool.isRequired,
    pushNotify: PropTypes.bool.isRequired,
    smsNotify: PropTypes.bool.isRequired,
    take: PropTypes.number.isRequired,
    templateView: PropTypes.string.isRequired
  }).isRequired,
  hasPhone: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired
};
