import React, { useContext, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { LoaderStatus } from "nav";
import { ModalFinish } from "./modalFinish";
import { replaceDialog } from "stores/pop";
import { getModel, resetModel, selectModel, ModelStore } from "stores/model";

export function Effect({ logicId, logicKey, callback, dispatch, children }) {
  const { logic, dispatchModel, statusModel } = selectModel(logicId, logicKey, useContext(ModelStore));

  useEffect(() => {
    if (statusModel.isReady) {
      if (statusModel.isEdit) {
        getModel(dispatchModel, { logicId, logicKey });
      } else if (statusModel.isReset) {
        resetModel(dispatchModel, { logicKey });
      } else if (statusModel.isSaved) {
        replaceDialog(dispatch, {
          component: <ModalFinish logicKey={logicKey} logicId={logic.logicId} callback={callback} dispatch={dispatch} />
        });
        resetModel(dispatchModel, { logicKey });
      }
    }
  }, [callback, dispatch, dispatchModel, logic, logicId, logicKey, statusModel]);

  return statusModel.isReady ? <Fragment>{children}</Fragment> : <LoaderStatus status={statusModel} />;
}

Effect.propTypes = {
  logicId: PropTypes.string,
  logicKey: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
