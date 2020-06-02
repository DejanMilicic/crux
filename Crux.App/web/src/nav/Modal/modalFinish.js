import React, { useContext, Suspense, lazy } from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import { DialogHead } from "components/furniture";
import { DialogOperate } from "components/operates";
import { Giphy } from "components/media";
import { NullLoader } from "nav";
import { postFilter, selectList, ListStore } from "stores/list";
import { selectDisplay, DisplayStore } from "stores/display";
import { Pickup } from "./pickup";

export function ModalFinish({ logicKey, logicId, callback, dispatch }) {
  const { params, dispatchList, statusList } = selectList(
    logicKey,
    useContext(ListStore)
  );

  const { current, statusDisplay, meta } = selectDisplay(
    logicId,
    logicKey,
    useContext(DisplayStore)
  );

  let model = {
    id: logicId,
    canAdd: false,
    canEdit: false,
    canDelete: false,
    canList: false,
    favourite: false
  };

  if (statusDisplay.isCurrent) {
    model = current;
  }

  if (statusDisplay.isFailed) {
    model.canEdit = true;
    model.canList = true;
  }

  const FinishComponent = lazy(() =>
    import("logic/" + logicKey + "/" + logicKey + "Finish")
  );

  function handleClose(dispatch) {
    callback(dispatch);
    if (!statusList.isCurrent) {
      postFilter(dispatchList, { logicKey, params });
    }
  }

  return (
    <Dialog
      open={true}
      onClose={() => {
        handleClose(dispatch);
      }}
      aria-labelledby="form-dialog-title"
    >
      <DialogHead callback={handleClose} dispatch={dispatch}>
        {meta.title}
      </DialogHead>
      <Pickup logicId={logicId} logicKey={logicKey}>
        <DialogContent>
          <Grid container direction="column" alignItems="center">
            <Giphy tags="win" />
            <Suspense fallback={<NullLoader />}>
              <FinishComponent logicId={logicId} display={current} />
            </Suspense>
          </Grid>
        </DialogContent>
        <DialogActions>
          <DialogOperate
            callback={handleClose}
            dispatch={dispatch}
            logicKey={logicKey}
            model={model}
            hasNav={false}
          />
        </DialogActions>
      </Pickup>
    </Dialog>
  );
}

ModalFinish.propTypes = {
  logicId: PropTypes.string.isRequired,
  logicKey: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};
