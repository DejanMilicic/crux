import React, { useContext } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { postFilter, selectList, ListStore } from "stores/list";

export function LoadButton({ logicKey }) {
  const { params, dispatchList, statusList } = selectList(logicKey, useContext(ListStore));

  function handleLoad() {
    postFilter(dispatchList, {
      logicKey: logicKey,
      params: { ...params, take: params.take + 10 },
    });
  }

  return statusList.isReady && statusList.isLoadable ? (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      <Button id="loadMore" variant="contained" color="primary" aria-label="load more" onClick={() => handleLoad()}>
        load more
      </Button>
    </Box>
  ) : null;
}

LoadButton.propTypes = {
  logicKey: PropTypes.string,
};
