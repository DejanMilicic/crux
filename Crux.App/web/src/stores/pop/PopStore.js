import React, { createContext } from "react";
import PropTypes from "prop-types";
import { useImmerReducer } from "use-immer";

export const PopStore = createContext();

export const initialState = {
  show: false,
  index: 0,
  current: {},
  stored: []
};

export function reducer(draft, action) {
  switch (action.type) {
    case "OPEN_DIALOG":
      draft.stored.push(action.payload);
      draft.current = action.payload;
      draft.index++;
      draft.show = true;
      return draft;
    case "CLOSE_DIALOG":
      if (draft.index > 0) {
        draft.show = false;
        draft.current = {};
        draft.index--;

        if (draft.stored.length > 0) {
          draft.stored.splice(draft.index, 1);
        }

        if (draft.index > 0 && draft.stored.length > 0) {
          draft.current = draft.stored[draft.index - 1];
          draft.show = true;
        }
      }

      return draft;
    case "REPLACE_DIALOG":
      if (draft.index > 0) {
        if (draft.stored.length > 0) {
          draft.stored.splice(draft.index - 1, 1);
        }
      }

      draft.show = true;
      draft.stored.push(action.payload);
      draft.current = action.payload;

      return draft;
    default:
      return draft;
  }
}

export function PopStoreProvider({ children }) {
  const [statePop, dispatchPop] = useImmerReducer(reducer, { ...initialState });
  const value = { statePop, dispatchPop };
  return <PopStore.Provider value={value}>{children}</PopStore.Provider>;
}

PopStoreProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
