export const openRetain = async (dispatch, identity) => {
  dispatch({ type: "OPEN_RETAIN", payload: identity });
};

export const saveRetain = async (dispatch, identity) => {
  dispatch({ type: "SAVE_RETAIN", payload: identity });
};
