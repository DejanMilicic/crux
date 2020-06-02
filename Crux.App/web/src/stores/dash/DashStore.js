import React, { createContext } from "react";
import PropTypes from "prop-types";
import { useImmerReducer } from "use-immer";
import { initial, loaded, loading, failed } from "stores";

export const DashStore = createContext();

export const initialState = {
  status: initial(),
  data: {},
  lastId: "",
  logicKey: "",
  operation: "",
  success: true
};

export function reducer(draft, action) {
  switch (action.type) {
    case "GET_DASH":
      draft.lastId = action.payload;
      draft.logicKey = action.logicKey;
      draft.operation = action.operation;
      draft.success = true;
      draft.status = loading();
      return draft;
    case "GET_DASH_SUCCESS":
      draft.success = action.payload.success;

      if (action.payload && action.payload.success) {
        draft.data = action.payload;
        draft.status = loaded();
      } else {
        draft.status = failed(action.payload.message);
      }

      return draft;
    case "GET_DASH_FAILURE":
      draft.success = false;
      draft.status = failed(action.payload.message);
      return draft;
    default:
      return draft;
  }
}

export function DashStoreProvider({ children }) {
  const [stateDash, dispatchDash] = useImmerReducer(reducer, initialState);
  const value = { stateDash, dispatchDash };
  return <DashStore.Provider value={value}>{children}</DashStore.Provider>;
}

DashStoreProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
