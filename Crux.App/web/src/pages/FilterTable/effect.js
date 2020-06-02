import React, { useContext, useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { LoaderStatus } from "nav";
import { postFilter, selectList, ListStore } from "stores/list";

export function Effect({ logicKey, children }) {
  const { params, dispatchList, statusList } = selectList(logicKey, useContext(ListStore));
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (statusList.isReady && (refresh || !statusList.isCurrent)) {
      postFilter(dispatchList, { params, logicKey });
      setRefresh(false);
    }
  }, [dispatchList, logicKey, refresh, params, statusList]);

  return statusList.isReady && statusList.isCurrent ? <Fragment>{children}</Fragment> : <LoaderStatus status={statusList} />;
}

Effect.propTypes = {
  logicKey: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
