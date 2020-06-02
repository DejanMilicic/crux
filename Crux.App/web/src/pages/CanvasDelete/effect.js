import React, { useContext, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { LoaderStatus } from "nav";
import { getDisplay, selectDisplay, DisplayStore } from "stores/display";

export function Effect({ logicId, logicKey, children }) {
  const { dispatchDisplay, statusDisplay } = selectDisplay(
    logicId,
    logicKey,
    useContext(DisplayStore)
  );

  useEffect(() => {
    if (statusDisplay.isReady && !statusDisplay.isCurrent) {
      getDisplay(dispatchDisplay, { id: logicId, logicKey: logicKey });
    }
  }, [dispatchDisplay, logicId, logicKey, statusDisplay]);

  return statusDisplay.isReady && statusDisplay.isCurrent ? (
    <Fragment>{children}</Fragment>
  ) : (
    <LoaderStatus status={statusDisplay} />
  );
}

Effect.propTypes = {
  logicId: PropTypes.string,
  logicKey: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
