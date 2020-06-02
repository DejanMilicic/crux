import React, { useContext, useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { LoaderStatus } from "nav";
import { getDisplay, selectDisplay, DisplayStore } from "stores/display";

export function Effect({ logicId, logicKey, model, children }) {
  const { dispatchDisplay, statusDisplay } = selectDisplay(logicId, logicKey, useContext(DisplayStore));
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (statusDisplay.isReady && refresh) {
      if (!model || model.id !== logicId) {
        getDisplay(dispatchDisplay, { id: logicId, logicKey });
        setRefresh(false);
      }
    }
  }, [dispatchDisplay, logicId, logicKey, refresh, statusDisplay, model]);

  return statusDisplay.isReady && model ? <Fragment>{children}</Fragment> : <LoaderStatus status={statusDisplay} />;
}

Effect.propTypes = {
  logicId: PropTypes.string.isRequired,
  logicKey: PropTypes.string.isRequired,
  model: PropTypes.shape({ id: PropTypes.string.isRequired }),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
