import React, { useContext } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import { DialogHead } from "components/furniture";
import { DialogOperate } from "components/operates";
import { Giphy } from "components/media";
import { postFilter, selectList, ListStore } from "stores/list";

export function DeleteFinish({ logicKey, callback, dispatch }) {
  const { params, dispatchList, statusList, meta } = selectList(logicKey, useContext(ListStore));

  function handleClose(dispatch) {
    callback(dispatch);
    if (!statusList.isCurrent) {
      postFilter(dispatchList, { logicKey, params });
    }
  }

  const model = {
    canAdd: true,
    canEdit: false,
    canDelete: false,
    canList: true,
    canCustom: false,
    canFavourite: false
  };

  return (
    <Dialog
      open={true}
      onClose={() => {
        handleClose(dispatch);
      }}
      aria-labelledby="form-dialog-title">
      <DialogHead callback={handleClose} dispatch={dispatch}>
        {meta.title}
      </DialogHead>
      <DialogContent>
        <Grid container direction="column" alignItems="center">
          <Giphy tags="failure" />
          <Typography variant="h6" color="textPrimary">
            The {meta.title} has been deleted
          </Typography>
        </Grid>
      </DialogContent>
      <DialogActions>
        <DialogOperate callback={handleClose} dispatch={dispatch} logicKey={logicKey} model={model} hasNav={false} />
      </DialogActions>
    </Dialog>
  );
}

DeleteFinish.propTypes = {
  logicKey: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};
