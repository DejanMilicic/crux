import API from "../api";

export const postFilter = async (dispatch, { logicKey, params }) => {
  dispatch({ type: "GET_FILTER", payload: params, logicKey });

  try {
    const response = await API.post("/" + logicKey + "/filter", params);
    const data = await response.data;
    return dispatch({
      type: "GET_FILTER_SUCCESS",
      payload: data,
      logicKey
    });
  } catch (error) {
    return dispatch({
      type: "GET_FILTER_FAILURE",
      payload: { message: error.message },
      logicKey
    });
  }
};

export const updateParams = async (dispatch, params) => {
  return dispatch({ type: "UPDATE_PARAMS", payload: params });
};

export const resetFilter = async (dispatch, params) => {
  return dispatch({ type: "RESET_FILTER", payload: params });
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
      logicKey,
      logicId
    });
  } catch (error) {
    return dispatch({
      type: "TOGGLE_FAV_FAILURE",
      payload: { message: error.message },
      logicKey
    });
  }
};
