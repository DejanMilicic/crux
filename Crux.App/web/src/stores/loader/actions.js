import API from "../api";

export const postFile = async (dispatch, file) => {
  dispatch({ type: "FILE_LOAD", payload: file });

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await API.post("/upload/", formData);
    const data = await response.data;
    return dispatch({
      type: "FILE_LOAD_SUCCESS",
      payload: data,
      name: file.name
    });
  } catch (error) {
    return dispatch({
      type: "FILE_LOAD_FAILURE",
      payload: { message: error.message }
    });
  }
};

export const queueFiles = async (dispatch, files) => {
  dispatch({ type: "QUEUE_BATCH", payload: files });
};

export const loadAll = async (dispatch, files) => {
  for (const file of files) {
    if (!file.isLoaded) {
      await loadSingle(dispatch, file);
    }
  }
};

export const loadSingle = async (dispatch, file) => {
  dispatch({ type: "QUEUE_START", payload: file.name });

  const formData = new FormData();
  formData.append("file", file.file);

  try {
    const response = await API.post("/upload/", formData);
    const data = await response.data;
    return dispatch({
      type: "FILE_LOAD_SUCCESS",
      payload: data,
      name: file.name
    });
  } catch (error) {
    return dispatch({
      type: "FILE_LOAD_FAILURE",
      payload: { message: error.message }
    });
  }
};

export const resetLoader = async dispatch => {
  return dispatch({ type: "RESET_LOADER" });
};

export const getGif = async (dispatch, { tags }) => {
  try {
    const response = await API.get("/loader/gif/" + tags);
    const data = await response.data;
    return dispatch({
      type: "GET_GIF_SUCCESS",
      payload: data
    });
  } catch (error) {
    return dispatch({
      type: "GET_GIF_FAILURE",
      payload: { message: error.message }
    });
  }
};
