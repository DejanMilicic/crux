import React, { useContext, useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { LoaderStatus } from "nav";
import { getDisplay, selectDisplay, DisplayStore } from "stores/display";

export function Effect({ logicId, children }) {
  const logicKey = "visible";

  const { current, dispatchDisplay, statusDisplay } = selectDisplay(logicId, logicKey, useContext(DisplayStore));

  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (statusDisplay.isReady && !statusDisplay.isCurrent && refresh) {
      getDisplay(dispatchDisplay, { id: logicId, logicKey });
      setRefresh(false);
    }
  }, [dispatchDisplay, logicId, refresh, statusDisplay]);

  return current && !statusDisplay.isLoading ? <Fragment>{children}</Fragment> : <LoaderStatus status={statusDisplay} />;
}

Effect.propTypes = {
  logicId: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
