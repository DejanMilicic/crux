import React, { useContext, useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { LoaderStatus } from "nav";
import { getDisplay, selectDisplay, DisplayStore } from "stores/display";

export function Pickup({ logicId, logicKey, children }) {
  const [state, setState] = useState({ id: logicId, failed: 0 });

  const { dispatchDisplay, statusDisplay } = selectDisplay(state.id, logicKey, useContext(DisplayStore));

  useEffect(() => {
    if (!statusDisplay.isLoading && !statusDisplay.isCurrent && state.failed < 3) {
      getDisplay(dispatchDisplay, {
        id: state.id,
        logicKey: logicKey,
      });
    }

    if (statusDisplay.isReady && !statusDisplay.isCurrent && state.failed < 3) {
      setState({ id: state.id, failed: state.failed + 1 });
    }
  }, [dispatchDisplay, logicKey, state, statusDisplay]);

  return statusDisplay.isReady ? <Fragment>{children}</Fragment> : <LoaderStatus status={statusDisplay} />;
}

Pickup.propTypes = {
  logicId: PropTypes.string,
  logicKey: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
