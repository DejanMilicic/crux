import React, { createContext } from "react";
import PropTypes from "prop-types";
import { useImmerReducer } from "use-immer";
import { initial, loaded, loading, failed } from "stores";

export const NoteStore = createContext();

export const initialState = {
  status: initial(),
  id: ""
};

export function reducer(draft, action) {
  switch (action.type) {
    case "GET_NOTES":
      draft.status = loading();
      draft.id = action.payload;
      return draft;
    case "GET_NOTES_SUCCESS":
      if (action.payload.notable.id === draft.id) {
        draft.notes = action.payload.notes;
        draft.display = action.payload.notable;
        draft.status = loaded();
      } else {
        draft.status = failed(action.payload.message);
      }

      return draft;
    case "SAVE_NOTE":
      draft.status = loading();
      draft.id = action.payload;
      return draft;
    case "SAVE_NOTE_SUCCESS":
      if (action.payload.notable.id === draft.id) {
        draft.notes = action.payload.notes;
        draft.display = action.payload.notable;
        draft.status = loaded();
      } else {
        draft.status = failed(action.payload.message);
      }

      return draft;
    case "DELETE_NOTE":
      draft.status = loading();
      draft.id = action.payload;
      return draft;
    case "DELETE_NOTE_SUCCESS":
      if (action.payload.notable.id === draft.id) {
        draft.notes = action.payload.notes;
        draft.display = action.payload.notable;
        draft.status = loaded();
      } else {
        draft.status = failed(action.payload.message);
      }

      return draft;
    case "GET_NOTES_FAILURE":
      draft.status = failed(action.payload.message);
      return draft;
    case "SAVE_NOTE_FAILURE":
      draft.status = failed(action.payload.message);
      return draft;
    case "DELETE_NOTE_FAILURE":
      draft.status = failed(action.payload.message);
      return draft;

    default:
      return draft;
  }
}

export function NoteStoreProvider({ children }) {
  const [stateNote, dispatchNote] = useImmerReducer(reducer, {
    ...initialState
  });
  const value = { stateNote, dispatchNote };
  return <NoteStore.Provider value={value}>{children}</NoteStore.Provider>;
}

NoteStoreProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
