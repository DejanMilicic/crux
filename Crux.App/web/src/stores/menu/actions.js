export const closeBurger = async dispatch => {
    return dispatch({ type: 'CLOSE_BURGER', payload: { open: false } });
};

export const openBurger = async dispatch => {
    return dispatch({ type: 'OPEN_BURGER', payload: { open: true } });
};

export const closeQuery = async dispatch => {
    return dispatch({ type: 'CLOSE_QUERY', payload: { open: false } });
};

export const openQuery = async (dispatch, logicKey) => {
    return dispatch({ type: 'OPEN_QUERY', payload: { open: true, logicKey: logicKey } });
};

export const closeSettings = async dispatch => {
    return dispatch({ type: 'CLOSE_SETTINGS', payload: { open: false } });
};

export const openSettings = async dispatch => {
    return dispatch({ type: 'OPEN_SETTINGS', payload: { open: true } });
};
