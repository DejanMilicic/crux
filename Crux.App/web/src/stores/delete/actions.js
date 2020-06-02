import API from "../api";

export const getDelete = async (dispatch, { id, logicKey }) => {
  dispatch({ type: "GET_DELETE", payload: id, logicKey });

  try {
    const response = await API.get("/" + logicKey + "/delete/" + id);
    const data = response.data;
    return dispatch({
      type: "GET_DELETE_SUCCESS",
      payload: data,
      logicKey
    });
  } catch (error) {
    return dispatch({
      type: "GET_DELETE_FAILURE",
      payload: { message: error.message },
      logicKey
    });
  }
};

export const resetDelete = async dispatch => {
  return dispatch({ type: "RESET_DELETE" });
};
