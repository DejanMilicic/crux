import React, { createContext } from "react";
import PropTypes from "prop-types";
import { useImmerReducer } from "use-immer";
import { initial, loaded, loading, failed } from "stores";

export const DeleteStore = createContext();

export const initialState = {
  status: initial(),
  archive: []
};

export function reducer(draft, action) {
  switch (action.type) {
    case "GET_DELETE":
      draft.status = loading();
      return draft;
    case "GET_DELETE_SUCCESS":
      if (action.payload.success) {
        draft.status = loaded();
        draft.archive.push({
          logicId: action.payload.identity,
          logicKey: action.logicKey
        });

        if (draft.archive.length > 5) {
          draft.archive.splice(0, 1);
        }
      } else {
        draft.status = failed(action.payload.message);
      }

      return draft;
    case "GET_DELETE_FAILURE":
      draft.status = failed(action.payload.message);
      return draft;
    case "RESET_ARCHIVE":
      draft.archive = [];
      return draft;
    default:
      return draft;
  }
}

export function DeleteStoreProvider({ children }) {
  const [stateDelete, dispatchDelete] = useImmerReducer(reducer, {
    ...initialState
  });
  const value = { stateDelete, dispatchDelete };
  return <DeleteStore.Provider value={value}>{children}</DeleteStore.Provider>;
}

DeleteStoreProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
