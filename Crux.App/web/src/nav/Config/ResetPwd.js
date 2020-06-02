import React, { useContext } from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { DialogHead } from "components/furniture";
import { PasswordInput } from "./passwordInput";
import { selectUser, UserStore } from "stores/user";
import { postOperate, OperateStore } from "stores/operate";

export function ResetPwd({ callback, dispatch }) {
  const { user } = selectUser(useContext(UserStore));
  const { dispatchOperate } = useContext(OperateStore);

  function handleReset(current, replacement) {
    postOperate(dispatchOperate, {
      logicId: user.id,
      logicKey: "user",
      operation: "reset",
      model: {
        id: user.id,
        current: current,
        replacement: replacement
      }
    });
    callback(dispatch);
  }

  return (
    <Dialog
      open={true}
      onClose={() => {
        callback(dispatch);
      }}
      aria-labelledby="form-dialog-title"
    >
      <DialogHead callback={callback} dispatch={dispatch}>
        Reset Password
      </DialogHead>
      <DialogContent>
        <PasswordInput
          callback={callback}
          dispatch={dispatch}
          handleReset={handleReset}
          isDialog={true}
        />
      </DialogContent>
    </Dialog>
  );
}

PasswordInput.propTypes = {
  callback: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};
