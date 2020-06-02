import React, { useContext, Suspense, lazy } from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { DialogHead } from "components/furniture";
import { Loader } from "nav";
import { selectDisplay, DisplayStore } from "stores/display";
import { DeleteOperate } from "./deleteOperate";
import { Effect } from "./effect";

export function Delete({ logicId, logicKey, callback, dispatch, viewModel }) {
  const { current, meta } = selectDisplay(logicId, logicKey, useContext(DisplayStore));

  const DisplayComponent = lazy(() => import("logic/" + logicKey + "/" + logicKey + "Display"));

  let model = viewModel;

  if (!model) {
    model = current;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Effect logicId={logicId} logicKey={logicKey}>
        <Dialog
          open={true}
          onClose={() => {
            callback(dispatch);
          }}
          aria-labelledby="form-dialog-title">
          <DialogHead callback={callback} dispatch={dispatch}>
            Delete {meta.title} ?
          </DialogHead>
          <DialogContent>
            <DisplayComponent model={model} logicId={logicId} callback={callback} dispatch={dispatch} isDialog={true} />
          </DialogContent>
          <DialogActions>
            <DeleteOperate logicId={logicId} logicKey={logicKey} callback={callback} dispatch={dispatch} isDialog={true} />
          </DialogActions>
        </Dialog>
      </Effect>
    </Suspense>
  );
}

Delete.propTypes = {
  logicId: PropTypes.string.isRequired,
  logicKey: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  viewModel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};
