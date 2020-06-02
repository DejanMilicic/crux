import API from '../api';

export const getConfig = async dispatch => {
    dispatch({ type: "GET_CONFIG" });

    try {
        const response = await API.get('/config/get');
        const data = await response.data;
        return dispatch({ type: 'GET_CONFIG_SUCCESS', payload: data });
    }
    catch (error) {
        return dispatch({ type: 'GET_CONFIG_FAILURE' });
    }
};

export const setConfig = async (dispatch, { key, value }) => {
    dispatch({ type: "SET_CONFIG", payload: { key: key, value: value } });

    try {
        const response = await API.get('/config/set/' + key + '/' + value);
        const data = await response.data;

        return dispatch({ type: 'SET_CONFIG_SUCCESS', payload: data });
    }
    catch (error) {
        return dispatch({ type: 'SET_CONFIG_FAILURE' });
    }
};

export const postLogin = async (dispatch, model) => {
    dispatch({ type: "LOGIN" });

    try {
        const response = await API.post('/login/auth', model);
        const data = await response.data;
        data.rememberMe = model.rememberMe;

        return dispatch({ type: 'LOGIN_SUCCESS', payload: data });
    }
    catch (error) {
        return dispatch({ type: 'LOGIN_FAILURE' });
    }
};

export const postReconnect = async (dispatch, model) => {
    dispatch({ type: "RECONNECT" });

    try {
        const response = await API.post('/login/reconnect', model);
        const data = await response.data;

        return dispatch({ type: 'RECONNECT_SUCCESS', payload: data });
    }
    catch (error) {
        return dispatch({ type: 'RECONNECT_FAILURE' });
    }
};

export const setLogout = async dispatch => {
    return dispatch({ type: "LOGOUT" });
};