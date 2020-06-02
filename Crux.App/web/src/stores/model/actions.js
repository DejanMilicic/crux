import API from "../api";

export const getModel = async (dispatch, { logicId, logicKey }) => {
  dispatch({
    type: "GET_MODEL",
    payload: logicId,
    logicKey
  });

  try {
    const response = await API.get("/" + logicKey + "/get/" + logicId);
    const data = await response.data;

    return dispatch({
      type: "GET_MODEL_SUCCESS",
      payload: data,
      logicKey
    });
  } catch (error) {
    return dispatch({
      type: "GET_MODEL_FAILURE",
      payload: { message: error.message },
      logicKey
    });
  }
};

export const updateModel = async (dispatch, { logicKey, model }) => {
  return dispatch({
    type: "UPDATE_MODEL",
    payload: model,
    logicKey
  });
};

export const postModel = async (dispatch, { logicKey, model }) => {
  dispatch({ type: "SAVE_MODEL", payload: model, logicKey });

  try {
    const response = await API.post("/" + logicKey + "/post", model);
    const data = await response.data;

    return dispatch({
      type: "SAVE_MODEL_SUCCESS",
      payload: data,
      logicKey
    });
  } catch (error) {
    return dispatch({
      type: "SAVE_MODEL_FAILURE",
      payload: { message: error.message },
      logicKey
    });
  }
};

export const resetModel = async (dispatch, logicKey) => {
  return dispatch({
    type: "RESET_MODEL",
    logicKey
  });
};
