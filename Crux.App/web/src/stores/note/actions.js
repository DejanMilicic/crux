import API from "../api";

export const getNotes = async (dispatch, { logicId, logicKey }) => {
  dispatch({ type: "GET_NOTES", payload: logicId, logicKey });

  try {
    const response = await API.get("/note/get/" + logicId);
    const data = await response.data;
    return dispatch({
      type: "GET_NOTES_SUCCESS",
      payload: data,
      logicKey
    });
  } catch (error) {
    return dispatch({
      type: "GET_NOTES_FAILURE",
      payload: { message: error.message },
      logicKey
    });
  }
};

export const postNote = async (dispatch, { logicKey, model }) => {
  dispatch({ type: "SAVE_NOTE", payload: model.id, logicKey });

  try {
    const response = await API.post("/note/post", model);
    const data = await response.data;

    return dispatch({
      type: "SAVE_NOTE_SUCCESS",
      payload: data,
      logicKey
    });
  } catch (error) {
    return dispatch({
      type: "SAVE_NOTE_FAILURE",
      payload: { message: error.message },
      logicKey
    });
  }
};

export const deleteNote = async (dispatch, { logicId, logicKey, counter }) => {
  dispatch({ type: "DELETE_NOTE", payload: logicId, logicKey });

  try {
    const response = await API.get("/note/delete/" + logicId + "/" + counter);
    const data = await response.data;
    return dispatch({
      type: "DELETE_NOTE_SUCCESS",
      payload: data,
      logicKey
    });
  } catch (error) {
    return dispatch({
      type: "DELETE_NOTE_FAILURE",
      payload: { message: error.message },
      logicKey
    });
  }
};
