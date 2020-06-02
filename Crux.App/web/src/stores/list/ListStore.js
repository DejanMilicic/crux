import React, { createContext } from "react";
import PropTypes from "prop-types";
import { useImmerReducer } from "use-immer";
import { initial, loaded, loading, failed } from "stores";

export const ListStore = createContext();

export const initialState = {
  status: initial(),
  logicKey: "",
  list: {
    data: [],
    paging: {
      total: 0,
      intervals: -1,
      loadable: false,
      skip: 0
    },
    success: false,
    message: ""
  },
  params: {
    search: "",
    skip: 0,
    take: 10,
    TenantRestrict: true,
    favouriteRestrict: false,
    authorKeys: []
  }
};

export function reducer(draft, action) {
  switch (action.type) {
    case "GET_FILTER":
      draft.status = loading();
      draft.params = action.payload;
      draft.logicKey = action.logicKey;
      return draft;
    case "GET_FILTER_SUCCESS":
      if (action.payload.success) {
        draft.status = loaded();
        draft.list = action.payload;
      } else {
        draft.status = failed(action.payload.message);
      }

      return draft;
    case "GET_FILTER_FAILURE":
      draft.status = failed(action.payload.message);
      return draft;
    case "UPDATE_PARAMS":
      draft.params = action.payload;
      return draft;
    case "TOGGLE_FAV_SUCCESS":
      draft.list.data.forEach(item => {
        if (item.id === action.logicId) {
          item.favourite = action.payload;
        }
      });

      return draft;
    case "TOGGLE_FAV_FAILURE":
      draft.status = failed(action.payload.message);
      return draft;
    case "RESET_FILTER":
      const resetParams = initialState.params;
      return {
        ...initialState,
        params: { ...resetParams, take: action.payload.take }
      };
    default:
      return draft;
  }
}

export function ListStoreProvider({ children }) {
  const [stateList, dispatchList] = useImmerReducer(reducer, {
    ...initialState
  });
  const value = { stateList, dispatchList };
  return <ListStore.Provider value={value}>{children}</ListStore.Provider>;
}

ListStoreProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
