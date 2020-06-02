import API from "../api";

export const getDash = async (dispatch, { id, logicKey, operation }) => {
  dispatch({
    type: "GET_DASH",
    payload: id,
    logicKey,
    operation
  });

  let uri = "/" + logicKey + "/" + operation;

  if (id) {
    uri = uri + "/" + id;
  }

  try {
    const response = await API.get(uri);
    const data = await response.data;
    return dispatch({
      type: "GET_DASH_SUCCESS",
      payload: data
    });
  } catch (error) {
    return dispatch({
      type: "GET_DASH_FAILURE",
      payload: { message: error.message }
    });
  }
};
