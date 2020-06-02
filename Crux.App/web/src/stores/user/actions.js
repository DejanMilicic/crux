import API from "../api";

export const getConfig = async dispatch => {
  dispatch({ type: "GET_CONFIG" });

  try {
    const response = await API.get("/config/get");
    const data = await response.data;
    return dispatch({
      type: "GET_CONFIG_SUCCESS",
      payload: data
    });
  } catch (error) {
    return dispatch({
      type: "GET_CONFIG_FAILURE",
      payload: { message: error.message }
    });
  }
};

export const setConfig = async (dispatch, { key, value }) => {
  dispatch({ type: "SET_CONFIG", payload: { key: key, value: value } });

  try {
    const response = await API.get("/config/set/" + key + "/" + value);
    const data = await response.data;

    return dispatch({
      type: "SET_CONFIG_SUCCESS",
      payload: data
    });
  } catch (error) {
    return dispatch({
      type: "SET_CONFIG_FAILURE",
      payload: { message: error.message }
    });
  }
};

export const postLogin = async (dispatch, model) => {
  dispatch({ type: "LOGIN" });

  try {
    const response = await API.post("/login/auth", model);
    const data = await response.data;
    data.rememberMe = model.rememberMe;

    return dispatch({
      type: "LOGIN_SUCCESS",
      payload: data
    });
  } catch (error) {
    return dispatch({
      type: "LOGIN_FAILURE",
      payload: { message: error.message }
    });
  }
};

export const postReconnect = async (dispatch, model) => {
  dispatch({ type: "RECONNECT" });

  try {
    const response = await API.post("/login/reconnect", model);
    const data = await response.data;

    return dispatch({
      type: "RECONNECT_SUCCESS",
      payload: data
    });
  } catch (error) {
    return dispatch({
      type: "RECONNECT_FAILURE",
      payload: { message: error.message }
    });
  }
};

export const setLogout = async dispatch => {
  return dispatch({ type: "LOGOUT" });
};

export const setForget = async dispatch => {
  return dispatch({ type: "FORGET_SET" });
};

export const endForget = async (dispatch, model) => {
  if (model && model.email) {
    const response = await API.post("/forgot/cancel", model);
    const data = await response.data;
    return dispatch({ type: "FORGET_END", payload: data });
  } else {
    return dispatch({ type: "FORGET_END" });
  }
};

export const postForgot = async (dispatch, model) => {
  dispatch({ type: "FORGET_CODE" });

  try {
    const response = await API.post("/forgot/code", model);
    const data = await response.data;

    return dispatch({
      type: "FORGET_CODE_SUCCESS",
      payload: data
    });
  } catch (error) {
    return dispatch({
      type: "FORGET_CODE_FAILURE",
      payload: { message: error.message }
    });
  }
};

export const postReply = async (dispatch, model) => {
  dispatch({ type: "FORGET_REPLY" });

  try {
    const response = await API.post("/forgot/reply", model);
    const data = await response.data;

    return dispatch({
      type: "FORGET_REPLY_SUCCESS",
      payload: data
    });
  } catch (error) {
    return dispatch({
      type: "FORGET_REPLY_FAILURE",
      payload: { message: error.message }
    });
  }
};

export const postReset = async (dispatch, model) => {
  dispatch({ type: "FORGET_RESET" });

  try {
    const response = await API.post("/forgot/reset", model);
    const data = await response.data;

    return dispatch({
      type: "FORGET_RESET_SUCCESS",
      payload: data
    });
  } catch (error) {
    return dispatch({
      type: "FORGET_RESET_FAILURE",
      payload: { message: error.message }
    });
  }
};

export const postTwoFactor = async (dispatch, model) => {
  dispatch({ type: "TWO_FACTOR_REPLY" });

  try {
    const response = await API.post("/login/twofactor", model);
    const data = await response.data;

    return dispatch({
      type: "TWO_FACTOR_REPLY_SUCCESS",
      payload: data
    });
  } catch (error) {
    return dispatch({
      type: "TWO_FACTOR_REPLY_FAILURE",
      payload: { message: error.message }
    });
  }
};

export const postSignup = async (dispatch, model) => {
  dispatch({ type: "SIGNUP" });

  try {
    const response = await API.post("/signup/post", model);
    const data = await response.data;

    return dispatch({
      type: "SIGNUP_SUCCESS",
      payload: data
    });
  } catch (error) {
    return dispatch({
      type: "SIGNUP_FAILURE",
      payload: { message: error.message }
    });
  }
};

export const postEntry = async (dispatch, model) => {
  dispatch({ type: "ENTRYKEY" });

  try {
    const response = await API.post("/signup/entry", model);
    const data = await response.data;

    return dispatch({
      type: "ENTRYKEY_SUCCESS",
      payload: data
    });
  } catch (error) {
    return dispatch({
      type: "ENTRYKEY_FAILURE",
      payload: { message: error.message }
    });
  }
};
