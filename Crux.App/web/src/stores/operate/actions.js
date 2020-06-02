import API from "../api";

export const getOperate = async (
  dispatch,
  { logicId, logicKey, operation }
) => {
  dispatch({
    type: "OPERATE",
    payload: logicId,
    logicKey,
    operation
  });

  try {
    const response = await API.get(
      "/" + logicKey + "/" + operation + "/" + logicId
    );
    const data = await response.data;
    return dispatch({
      type: "OPERATE_SUCCESS",
      payload: data,
      logicKey
    });
  } catch (error) {
    return dispatch({
      type: "OPERATE_FAILURE",
      payload: { message: error.message },
      logicKey
    });
  }
};

export const postOperate = async (
  dispatch,
  { logicId, logicKey, operation, model }
) => {
  dispatch({
    type: "OPERATE",
    payload: logicId,
    logicKey,
    operation
  });

  try {
    const response = await API.post("/" + logicKey + "/" + operation, model);
    const data = await response.data;
    return dispatch({
      type: "OPERATE_SUCCESS",
      payload: data,
      logicKey
    });
  } catch (error) {
    return dispatch({
      type: "OPERATE_FAILURE",
      payload: { message: error.message },
      logicKey
    });
  }
};

export const setOperate = async (
  dispatch,
  { logicId, logicKey, operation, set }
) => {
  dispatch({
    type: "OPERATE",
    payload: logicId,
    logicKey,
    operation
  });

  try {
    const response = await API.get(
      "/" + logicKey + "/" + operation + "/" + logicId + "/" + set
    );
    const data = await response.data;
    return dispatch({
      type: "OPERATE_SUCCESS",
      payload: data,
      logicKey
    });
  } catch (error) {
    return dispatch({
      type: "OPERATE_FAILURE",
      payload: { message: error.message },
      logicKey
    });
  }
};
