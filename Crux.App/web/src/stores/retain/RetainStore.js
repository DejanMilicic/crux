import React, { createContext } from "react";
import PropTypes from "prop-types";
import { useImmerReducer } from "use-immer";
import { metaFind } from "logic";

export const RetainStore = createContext();

export const initialState = {
  show: false,
  stored: []
};

export function reducer(draft, action) {
  switch (action.type) {
    case "OPEN_RETAIN":
      let open = draft.stored.find(e => e.logicKey === action.payload.logicKey);
      draft.stored.splice(draft.stored.indexOf(open), 1);

      if (draft.stored.length === 0) {
        draft.show = false;
      }

      return draft;
    case "SAVE_RETAIN":
      let closed = draft.stored.find(
        e => e.logicKey === action.payload.logicKey
      );

      if (!closed) {
        const metaClosed = metaFind(action.payload.logicKey);
        closed = {
          logicKey: action.payload.logicKey,
          logicId: action.payload.logicId,
          logicIcon: metaClosed.logicIcon,
          logicTitle: metaClosed.logicTitle,
          isProfile: action.payload.isProfile,
          isDialog: action.payload.isDialog
        };
        draft.stored.push(closed);
      }

      draft.show = true;

      return draft;
    default:
      return draft;
  }
}

export function RetainStoreProvider({ children }) {
  const [stateRetain, dispatchRetain] = useImmerReducer(reducer, {
    ...initialState
  });
  const value = { stateRetain, dispatchRetain };
  return <RetainStore.Provider value={value}>{children}</RetainStore.Provider>;
}

RetainStoreProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
