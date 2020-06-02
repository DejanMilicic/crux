import React, { useContext } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import PropTypes from "prop-types";
import { DialogHead } from "components/furniture";
import { ConfigInput } from "./configInput";
import { setConfig, selectUser, UserStore } from "stores/user";

export function Config({ callback, dispatch }) {
  const { config, user, dispatchUser } = selectUser(useContext(UserStore));

  function handleChange(key, value) {
    setConfig(dispatchUser, { key: key, value: value });
  }

  return (
    <Dialog
      open={true}
      onClose={() => {
        callback(dispatch);
      }}
      aria-labelledby="form-dialog-title">
      <DialogHead callback={callback} dispatch={dispatch}>
        Settings
      </DialogHead>
      <DialogContent>
        <ConfigInput callback={callback} dispatch={dispatch} handleChange={handleChange} model={config} hasPhone={user.hasPhone} isDialog={true} />
      </DialogContent>
    </Dialog>
  );
}

Config.propTypes = {
  callback: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};
