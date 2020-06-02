import React, { createContext } from "react";
import PropTypes from "prop-types";
import { useImmerReducer } from "use-immer";
import { metaFind } from "logic";
import { initial, loaded, loading, failed } from "stores";

export const ModelStore = createContext();

export const initialState = {
  status: initial(),
  stored: [],
  archive: []
};

export function reducer(draft, action) {
  switch (action.type) {
    case "GET_MODEL":
      let newLogic = draft.stored.find(e => e.logicKey === action.logicKey);

      if (!newLogic) {
        newLogic = {
          logicId: action.payload,
          logicKey: action.logicKey,
          hasChanged: false,
          hasSaved: false
        };
        draft.stored.push(newLogic);
      }

      draft.status = loading();

      return draft;
    case "GET_MODEL_SUCCESS":
      if (action.payload.id) {
        let existLogic = draft.stored.find(e => e.logicKey === action.logicKey);
        existLogic.logicId = action.payload.id;
        existLogic.model = action.payload;
        existLogic.hasChanged = false;
        existLogic.hasSaved = false;
        draft.status = loaded();
      } else {
        draft.status = failed(action.payload.message);
      }

      return draft;
    case "SAVE_MODEL":
      const metaStale = metaFind(action.logicKey);
      let staleLogic = draft.stored.find(e => e.logicKey === action.logicKey);

      if (!staleLogic) {
        staleLogic = {
          model: action.payload,
          logicId: action.payload.id,
          logicKey: action.logicKey,
          logicIcon: metaStale.icon,
          logicTitle: metaStale.title,
          hasChanged: true,
          hasSaved: false
        };
        draft.stored.push(staleLogic);
      } else {
        staleLogic.model = action.payload;
        staleLogic.logicId = action.payload.id;
        staleLogic.logicKey = action.logicKey;
        staleLogic.logicIcon = metaStale.icon;
        staleLogic.logicTitle = metaStale.title;
        staleLogic.logicName = action.payload.name;
      }

      draft.status = loading();

      return draft;
    case "SAVE_MODEL_SUCCESS":
      if (action.payload.success) {
        let writeLogic = draft.stored.find(e => e.logicKey === action.logicKey);
        writeLogic.hasChanged = false;
        writeLogic.hasSaved = true;
        writeLogic.logicId = action.payload.identity;
        writeLogic.model.id = action.payload.identity;

        const metaWrite = metaFind(action.logicKey);
        draft.archive = draft.archive.filter(
          a => a.logicId !== action.payload.identity
        );
        draft.archive.push({
          logicKey: writeLogic.logicKey,
          logicId: writeLogic.logicId,
          logicIcon: metaWrite.icon,
          logicTitle: metaWrite.title,
          logicName: writeLogic.model.name
        });
        if (draft.archive.length > 5) {
          draft.archive.splice(0, 1);
        }

        draft.status = loaded();
      } else {
        draft.status = failed(action.payload.message);
      }

      return draft;
    case "UPDATE_MODEL":
      let updateLogic = draft.stored.find(e => e.logicKey === action.logicKey);

      if (updateLogic) {
        updateLogic.hasChanged = true;
        updateLogic.hasSaved = false;
        updateLogic.model = action.payload;
      } else {
        updateLogic = {
          logicId: action.payload.id,
          logicKey: action.logicKey,
          model: action.payload,
          hasChanged: true,
          hasSaved: false
        };
        draft.stored.push(updateLogic);
      }

      return draft;
    case "RESET_MODEL":
      const resetLogic = draft.stored.find(e => e.logicKey === action.logicKey);
      draft.stored.splice(draft.stored.indexOf(resetLogic), 1);
      return draft;
    case "GET_MODEL_FAILURE":
      draft.status = failed(action.payload.message);
      return draft;
    case "SAVE_MODEL_FAILURE":
      draft.status = failed(action.payload.message);
      return draft;
    default:
      return draft;
  }
}

export function ModelStoreProvider({ children }) {
  const [stateModel, dispatchModel] = useImmerReducer(reducer, {
    ...initialState
  });
  const value = { stateModel, dispatchModel };
  return <ModelStore.Provider value={value}>{children}</ModelStore.Provider>;
}

ModelStoreProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
