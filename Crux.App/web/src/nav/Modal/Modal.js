import React, { useContext, Suspense, lazy } from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { DialogHead } from "components/furniture";
import { Loader } from "nav";
import { selectModel, ModelStore } from "stores/model";
import { Effect } from "./effect";

export function Modal({ logicId, logicKey, callback, dispatch }) {
  const { meta } = selectModel(logicId, logicKey, useContext(ModelStore));

  const ModalComponent = lazy(() => import("logic/" + logicKey + "/" + logicKey + "Input"));

  return (
    <Suspense fallback={<Loader />}>
      <Effect logicId={logicId} logicKey={logicKey} dispatch={dispatch} callback={callback}>
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
            <ModalComponent callback={callback} dispatch={dispatch} isDialog={true} />
          </DialogContent>
        </Dialog>
      </Effect>
    </Suspense>
  );
}

Modal.propTypes = {
  logicId: PropTypes.string,
  logicKey: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};
