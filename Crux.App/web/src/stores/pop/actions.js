export const openDialog = async (dispatch, { component }) => {
  dispatch({ type: "OPEN_DIALOG", payload: component });
};

export const closeDialog = async dispatch => {
  dispatch({ type: "CLOSE_DIALOG" });
};

export const replaceDialog = async (dispatch, { component }) => {
  dispatch({ type: "REPLACE_DIALOG", payload: component });
};
