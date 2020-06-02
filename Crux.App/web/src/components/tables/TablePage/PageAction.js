import React, { useContext } from "react";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { postFilter, selectCurrent, ListStore } from "stores/list";

export function PageAction() {
  const { logicKey, list, params, dispatchList } = selectCurrent(
    useContext(ListStore)
  );

  return (
    <Box display="flex">
      <IconButton
        id="first"
        onClick={() => {
          postFilter(dispatchList, {
            logicKey,
            params: { ...params, skip: 0 }
          });
        }}
        disabled={params.skip <= 0}
        aria-label="First Page"
      >
        <Icon>first_page</Icon>
      </IconButton>
      <IconButton
        id="previous"
        onClick={() => {
          postFilter(dispatchList, {
            logicKey,
            params: { ...params, skip: params.skip - 1 }
          });
        }}
        disabled={params.skip <= 0}
        aria-label="Previous Page"
      >
        <Icon>keyboard_arrow_left</Icon>
      </IconButton>
      <IconButton
        id="next"
        onClick={() => {
          postFilter(dispatchList, {
            logicKey,
            params: { ...params, skip: params.skip + 1 }
          });
        }}
        disabled={params.skip >= list.paging.intervals}
        aria-label="Next Page"
      >
        <Icon>keyboard_arrow_right</Icon>
      </IconButton>
      <IconButton
        id="last"
        onClick={() => {
          postFilter(dispatchList, {
            logicKey,
            params: {
              ...params,
              skip: list.paging.intervals
            }
          });
        }}
        disabled={params.skip >= list.paging.intervals}
        aria-label="Last Page"
      >
        <Icon>last_page</Icon>
      </IconButton>
    </Box>
  );
}
