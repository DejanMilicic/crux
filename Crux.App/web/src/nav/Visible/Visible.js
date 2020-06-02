import React, { useContext, Suspense, lazy } from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { DialogHead } from "components/furniture";
import { MediaOperate } from "components/operates";
import { Loader } from "nav";
import { getDisplay, setDisplay, selectDisplay, DisplayStore } from "stores/display";
import { Effect } from "./effect";

export function Visible({ logicId, dispatch, callback, viewModel }) {
  const logicKey = "visible";

  const { current, dispatchDisplay } = selectDisplay(logicId, logicKey, useContext(DisplayStore));

  let model = viewModel;

  if (current && (!model || model.id === current.id || current.id === logicId)) {
    model = current;
  } else if ((!current && model) || (model && model.id !== current.id)) {
    setDisplay(dispatchDisplay, { logicKey, model });
  }

  let visibleType = "ImageFull";

  if (model) {
    if (model.isVideo) {
      visibleType = "VideoFull";
    }

    if (model.isDocument) {
      visibleType = "DocFull";
    }
  }
  const DisplayComponent = lazy(() => import("nav/Visible/" + visibleType));

  function handleNav(id) {
    getDisplay(dispatchDisplay, { id, logicKey: "visible" });
  }

  return (
    <Suspense fallback={<Loader />}>
      <Effect logicId={logicId}>
        <Dialog
          open={true}
          onClose={() => {
            callback(dispatch);
          }}
          aria-labelledby="form-dialog-title">
          <DialogHead callback={callback} dispatch={dispatch}>
            {model ? model.name : null}
          </DialogHead>
          <DialogContent>{model ? <DisplayComponent fullUrl={model.fullUrl} id={model.id} name={model.name} /> : null}</DialogContent>
          <DialogActions>
            <MediaOperate logicKey="visible" visible={model} handleNav={handleNav} hasNav={true} />
          </DialogActions>
        </Dialog>
      </Effect>
    </Suspense>
  );
}

Visible.propTypes = {
  logicId: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  viewModel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    thumbUrl: PropTypes.string.isRequired,
    fullUrl: PropTypes.string.isRequired,
    canDelete: PropTypes.bool,
    favourite: PropTypes.bool,
  }),
};
