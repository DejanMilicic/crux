import React, { createContext } from "react";
import PropTypes from "prop-types";
import { useImmerReducer } from "use-immer";
import { initial, loaded, loading, failed } from "stores";
import { metaFind } from "logic";

export const DisplayStore = createContext();

export const initialState = {
  status: initial(),
  stored: [],
  archive: []
};

export function reducer(draft, action) {
  switch (action.type) {
    case "GET_DISPLAY":
      let newLogic = draft.stored.find(e => e.logicKey === action.logicKey);

      if (!newLogic) {
        newLogic = {
          logicId: action.payload,
          logicKey: action.logicKey
        };
        draft.stored.push(newLogic);
      }

      draft.status = loading();

      return draft;
    case "GET_DISPLAY_SUCCESS":
      if (action.payload.id) {
        const metaExisting = metaFind(action.logicKey);
        draft.archive = draft.archive.filter(
          a => a.logicId !== action.payload.id
        );
        draft.archive.push({
          logicId: action.payload.id,
          logicKey: action.logicKey,
          logicIcon: metaExisting.icon,
          logicTitle: metaExisting.title,
          logicName: action.payload.name
        });
        if (draft.archive.length > 5) {
          draft.archive.splice(0, 1);
        }

        let existLogic = draft.stored.find(e => e.logicKey === action.logicKey);
        existLogic.logicId = action.payload.id;
        existLogic.current = action.payload;
        draft.status = loaded();
      } else {
        draft.status = failed(action.payload.message);
      }

      return draft;
    case "SET_DISPLAY":
      if (action.payload.id) {
        const metaSet = metaFind(action.logicKey);
        draft.archive = draft.archive.filter(
          e => e.logicId !== action.payload.id
        );
        draft.archive.push({
          logicId: action.payload.id,
          logicKey: action.logicKey,
          logicIcon: metaSet.icon,
          logicTitle: metaSet.title,
          logicName: action.payload.name
        });

        if (draft.archive.length > 5) {
          draft.archive.splice(0, 1);
        }

        let setLogic = draft.stored.find(e => e.logicKey === action.logicKey);

        if (setLogic) {
          setLogic.logicId = action.payload.id;
          setLogic.current = action.payload;
        } else {
          setLogic = {
            logicId: action.payload.id,
            logicKey: action.logicKey,
            current: action.payload
          };
          draft.stored.push(setLogic);
        }

        draft.status = loaded();
      } else {
        draft.status = failed(action.payload.message);
      }

      return draft;
    case "RESET_DISPLAY":
      const resetLogic = draft.stored.find(e => e.logicKey === action.logicKey);
      draft.stored.splice(draft.stored.indexOf(resetLogic), 1);
      return draft;
    case "TOGGLE_FAV_SUCCESS":
      const favLogic = draft.stored.find(e => e.logicKey === action.logicKey);
      favLogic.current.favourite = action.payload;
      return draft;
    case "GET_DISPLAY_FAILURE":
      draft.status = failed(action.payload.message);
      return draft;
    case "TOGGLE_FAV_FAILURE":
      draft.status = failed(action.payload.message);
      return draft;
    default:
      return draft;
  }
}

export function DisplayStoreProvider({ children }) {
  const [stateDisplay, dispatchDisplay] = useImmerReducer(reducer, {
    ...initialState
  });
  const value = { stateDisplay, dispatchDisplay };
  return (
    <DisplayStore.Provider value={value}>{children}</DisplayStore.Provider>
  );
}

DisplayStoreProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
