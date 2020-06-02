import React, { createContext } from "react";
import PropTypes from "prop-types";
import { useImmerReducer } from "use-immer";
import { initial, loaded, loading, failed } from "stores";

export const OperateStore = createContext();

export const initialState = {
  status: initial(),
  lastId: "",
  logicKey: "",
  operation: "",
  success: true
};

export function reducer(draft, action) {
  switch (action.type) {
    case "OPERATE":
      draft.status = loading();
      draft.lastId = action.payload;
      draft.logicKey = action.logicKey;
      draft.operation = action.operation;
      return draft;
    case "OPERATE_SUCCESS":
      if (action.payload) {
        draft.success = action.payload.success;

        if (action.payload.identity && action.payload.success) {
          draft.status = loaded();
        } else {
          draft.status = failed(action.payload.message);
        }
      } else {
        draft.success = "false";
        draft.status = failed("no response from server");
      }

      return draft;
    case "OPERATE_FAILURE":
      draft.status = failed(action.payload.message);
      draft.success = false;
      return draft;
    default:
      return draft;
  }
}

export function OperateStoreProvider({ children }) {
  const [stateOperate, dispatchOperate] = useImmerReducer(reducer, {
    ...initialState
  });
  const value = { stateOperate, dispatchOperate };
  return (
    <OperateStore.Provider value={value}>{children}</OperateStore.Provider>
  );
}

OperateStoreProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
