import React, { useContext, Suspense, lazy } from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { DialogHead } from "components/furniture";
import { DialogOperate } from "components/operates";
import { Loader } from "nav";
import { getDisplay, setDisplay, selectDisplay, DisplayStore } from "stores/display";
import { Effect } from "./effect";

export function Display({ logicId, logicKey, callback, dispatch, viewModel }) {
  const { current, dispatchDisplay, meta } = selectDisplay(logicId, logicKey, useContext(DisplayStore));

  let model = viewModel;

  if (!model || model.id === current.id) {
    model = current;
  } else if (!current || (model && model.id !== current.id)) {
    setDisplay(dispatchDisplay, { logicKey, model });
  }

  const DisplayComponent = lazy(() => import("logic/" + logicKey + "/" + logicKey + "Display"));

  function handleNav(id) {
    getDisplay(dispatchDisplay, { id: id, logicKey: logicKey });
  }

  return (
    <Suspense fallback={<Loader />}>
      <Effect logicId={logicId} logicKey={logicKey} model={model}>
        <Dialog
          open={true}
          onClose={() => {
            callback(dispatch);
          }}
          aria-labelledby="form-dialog-title">
          <DialogHead callback={callback} dispatch={dispatch}>
            {meta.title}
          </DialogHead>
          <DialogContent>
            <DisplayComponent model={model} logicId={logicId} callback={callback} dispatch={dispatch} isDialog={true} />
          </DialogContent>
          <DialogActions>
            <DialogOperate logicKey={logicKey} model={model} handleNav={handleNav} hasNav />
          </DialogActions>
        </Dialog>
      </Effect>
    </Suspense>
  );
}

Display.propTypes = {
  logicId: PropTypes.string.isRequired,
  logicKey: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  viewModel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};
