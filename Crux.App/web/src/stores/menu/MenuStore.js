import React, { createContext } from "react";
import PropTypes from "prop-types";
import { useImmerReducer } from "use-immer";

export const MenuStore = createContext();

export const initialState = {
  burger: {
    isOpen: false
  },
  query: {
    isOpen: false,
    logicKey: "user"
  },
  settings: {
    isOpen: false
  }
};

function closeAll(state) {
  if (state.burger) {
    state.burger.isOpen = false;
  }

  if (state.query) {
    state.query.isOpen = false;
  }

  if (state.settings) {
    state.settings.isOpen = false;
  }
}

export function reducer(draft, action) {
  switch (action.type) {
    case "OPEN_BURGER":
      closeAll(draft);
      draft.burger.isOpen = action.payload.open;
      return draft;
    case "CLOSE_BURGER":
      draft.burger.isOpen = action.payload.open;
      return draft;
    case "OPEN_QUERY":
      closeAll(draft);
      draft.query.logicKey = action.payload.logicKey;
      draft.query.isOpen = action.payload.open;
      return draft;
    case "CLOSE_QUERY":
      draft.query.isOpen = action.payload.open;
      return draft;
    case "OPEN_SETTINGS":
      closeAll(draft);
      draft.settings.isOpen = action.payload.open;
      return draft;
    case "CLOSE_SETTINGS":
      draft.settings.isOpen = action.payload.open;
      return draft;
    default:
      return draft;
  }
}

export function MenuStoreProvider({ children }) {
  const [stateMenu, dispatchMenu] = useImmerReducer(reducer, {
    ...initialState
  });
  const value = { stateMenu, dispatchMenu };
  return <MenuStore.Provider value={value}>{children}</MenuStore.Provider>;
}

MenuStoreProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
