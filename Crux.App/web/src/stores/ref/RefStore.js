import React, { createContext } from "react";
import PropTypes from "prop-types";
import { useImmerReducer } from "use-immer";
import { initial, loaded, loading, failed } from "stores";

export const RefStore = createContext();

export const initialState = {
  stored: []
};

export const initialRef = {
  logicKey: "",
  status: initial(),
  model: {
    data: [],
    total: 0,
    intervals: -1,
    loadable: false,
    skip: 0,
    success: false,
    message: ""
  },
  params: {}
};

export function reducer(draft, action) {
  switch (action.type) {
    case "GET_REF":
      let newLogic = draft.stored.find(e => e.logicKey === action.logicKey);

      if (!newLogic) {
        newLogic = {
          ...initialRef,
          params: action.payload,
          logicKey: action.logicKey,
          status: loading()
        };

        draft.stored.push(newLogic);
      } else {
        newLogic.params = action.payload;
        newLogic.status = loading();
      }

      return draft;
    case "GET_REF_SUCCESS":
      let existLogic = draft.stored.find(e => e.logicKey === action.logicKey);

      if (action.payload && action.payload.success) {
        existLogic.model = action.payload;
        existLogic.status = loaded();
      } else {
        existLogic.status = failed(action.payload.message);
      }

      return draft;
    case "GET_REF_FAILURE":
      let failLogic = draft.stored.find(e => e.logicKey === action.logicKey);
      failLogic.status = failed(action.payload.message);
      return draft;
    case "RESET_REF":
      return { stored: [] };
    default:
      return draft;
  }
}

export function RefStoreProvider({ children }) {
  const [stateRef, dispatchRef] = useImmerReducer(reducer, { ...initialState });
  const value = { stateRef, dispatchRef };
  return <RefStore.Provider value={value}>{children}</RefStore.Provider>;
}

RefStoreProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
