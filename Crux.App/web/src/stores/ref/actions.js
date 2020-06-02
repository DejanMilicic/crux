import API from "../api";

const initialParams = {
  search: "",
  TenantRestrict: true
};

export const postRef = async (dispatch, { logicKey, params }) => {
  if (!params) {
    params = initialParams;
  }

  dispatch({ type: "GET_REF", payload: params, logicKey });

  try {
    const response = await API.post("/" + logicKey + "/ref", params);
    const data = await response.data;
    return dispatch({
      type: "GET_REF_SUCCESS",
      payload: data,
      logicKey
    });
  } catch (error) {
    return dispatch({
      type: "GET_REF_FAILURE",
      payload: { message: error.message },
      logicKey
    });
  }
};

export const resetRef = async dispatch => {
  return dispatch({ type: "RESET_REF" });
};
