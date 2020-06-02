import React, { createContext } from "react";
import PropTypes from "prop-types";
import { useImmerReducer } from "use-immer";
import { initial, loaded, loading, failed } from "stores";

export const LoaderStore = createContext();

export const initialState = {
  status: initial(),
  files: []
};

export function reducer(draft, action) {
  switch (action.type) {
    case "FILE_LOAD":
      if (action.payload) {
        let newFile = draft.files.find(e => e.name === action.payload.name);

        if (!newFile) {
          newFile = {
            file: action.payload,
            name: action.payload.name,
            size: action.payload.size,
            type: action.payload.type,
            id: "",
            success: false,
            isLoading: true,
            isLoaded: false,
            isFailed: false
          };
          draft.files.push(newFile);
        }

        draft.status = loading();
      } else {
        draft.status = failed("failed to read file");
      }

      return draft;
    case "FILE_LOAD_SUCCESS":
      if (action.payload.id) {
        let loadedFile = draft.files.find(e => e.name === action.name);

        if (loadedFile) {
          loadedFile.id = action.payload.id;
          loadedFile.thumbUrl = action.payload.thumbUrl;
          loadedFile.isLoading = false;
          loadedFile.isLoaded = true;
          loadedFile.isFailed = false;
        }

        draft.status = loaded();
      } else {
        draft.status = failed(action.payload.message);
      }

      return draft;
    case "FILE_LOAD_FAILURE":
      draft.status = failed(action.payload.message);
      return draft;
    case "QUEUE_START":
      if (action.payload) {
        let queueFile = draft.files.find(e => e.name === action.payload);

        if (queueFile && !queueFile.isLoaded) {
          queueFile.isLoading = true;
          queueFile.isLoaded = false;
          queueFile.isFailed = false;

          draft.status = loaded();
        } else {
          draft.status = failed(action.payload.message);
        }
      } else {
        draft.status = failed("missing file");
      }

      return draft;
    case "QUEUE_BATCH":
      if (action.payload && action.payload.length > 0) {
        action.payload.forEach(file => {
          let checkFile = draft.files.find(e => e.name === file.name);

          if (!checkFile) {
            checkFile = {
              file: file,
              name: file.name,
              size: file.size,
              type: file.type,
              id: "",
              success: false,
              isLoading: false,
              isLoaded: false,
              isFailed: false
            };
            checkFile.file = file;
            draft.files.push(checkFile);
          }
        });

        draft.status = loaded();
      } else {
        draft.status = failed("cannot read files");
      }

      return draft;
    case "RESET_LOADER":
      return { ...initialState, files: [] };

    case "GET_GIF_SUCCESS":
      if (action.payload) {
        draft.gif = action.payload;
      } else {
        draft.gif = "https://ourdefaultgif.com/gif";
      }

      return draft;
    case "GET_GIF_FAILURE":
      draft.gif = "https://ourdefaultgif.com/gif";
      return draft;

    default:
      return draft;
  }
}

export function LoaderStoreProvider({ children }) {
  const [stateLoader, dispatchLoader] = useImmerReducer(reducer, {
    ...initialState
  });
  const value = { stateLoader, dispatchLoader };
  return <LoaderStore.Provider value={value}>{children}</LoaderStore.Provider>;
}

LoaderStoreProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
