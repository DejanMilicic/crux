import API from "../api";

export const getDisplay = async (dispatch, { id, logicKey }) => {
  dispatch({ type: "GET_DISPLAY", payload: id, logicKey });

  try {
    const response = await API.get("/" + logicKey + "/display/" + id);
    const data = await response.data;
    return dispatch({
      type: "GET_DISPLAY_SUCCESS",
      payload: data,
      logicKey
    });
  } catch (error) {
    return dispatch({
      type: "GET_DISPLAY_FAILURE",
      payload: { message: error.message },
      logicKey
    });
  }
};

export const setDisplay = async (dispatch, { logicKey, model }) => {
  return dispatch({
    type: "SET_DISPLAY",
    payload: model,
    logicKey
  });
};

export const resetDisplay = async (dispatch, logicKey) => {
  return dispatch({
    type: "RESET_DISPLAY",
    logicKey
  });
};

export const toggleFav = async (dispatch, { logicId, logicKey, favourite }) => {
  let urlParam = "add";

  if (favourite) {
    urlParam = "remove";
  }

  try {
    const response = await API.get(
      "/fav/" + urlParam + "/" + logicKey + "/" + logicId
    );
    const data = await response.data;
    return dispatch({
      type: "TOGGLE_FAV_SUCCESS",
      payload: data,
      logicKey
    });
  } catch (error) {
    return dispatch({
      type: "TOGGLE_FAV_FAILURE",
      payload: { message: error.message },
      logicKey
    });
  }
};
