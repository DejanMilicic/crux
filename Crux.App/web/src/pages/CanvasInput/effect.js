import React, { useContext, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";
import { LoaderStatus } from "nav";
import { getModel, resetModel, selectModel, ModelStore } from "stores/model";

export function Effect({ logicId, logicKey, children }) {
  const { logic, dispatchModel, statusModel } = selectModel(logicId, logicKey, useContext(ModelStore));

  useEffect(() => {
    if (statusModel.isReady) {
      if (statusModel.isEdit) {
        getModel(dispatchModel, { logicId, logicKey });
      } else if (statusModel.isReset) {
        resetModel(dispatchModel, { logicKey });
      } else if (statusModel.isSaved) {
        navigate("/finish/" + logicKey + "/" + logic.logicId);
        resetModel(dispatchModel, { logicKey: logicKey });
      }
    }
  }, [dispatchModel, logic, logicId, logicKey, statusModel]);

  return statusModel.isReady ? <Fragment>{children}</Fragment> : <LoaderStatus status={statusModel} />;
}

Effect.propTypes = {
  logicId: PropTypes.string,
  logicKey: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
