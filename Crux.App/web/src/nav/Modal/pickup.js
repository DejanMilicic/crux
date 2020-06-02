import React, { useContext, useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { LoaderStatus } from "nav";
import { getDisplay, selectDisplay, DisplayStore } from "stores/display";

export function Pickup({ logicKey, logicId, children }) {
  const { dispatchDisplay, statusDisplay } = selectDisplay(logicId, logicKey, useContext(DisplayStore));
  const [state, setState] = useState({ id: logicId, failed: 0 });

  useEffect(() => {
    if (!statusDisplay.isLoading && !statusDisplay.isCurrent && state.failed < 3) {
      getDisplay(dispatchDisplay, {
        id: state.id,
        logicKey: logicKey
      });
    }

    if (statusDisplay.isReady && state.failed < 3) {
      setState({ id: state.id, failed: state.failed + 1 });
    }
  }, [dispatchDisplay, logicKey, state, statusDisplay]);

  return statusDisplay.isReady ? <Fragment>{children}</Fragment> : <LoaderStatus status={statusDisplay} />;
}

Pickup.propTypes = {
  logicId: PropTypes.string.isRequired,
  logicKey: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
