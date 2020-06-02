import React, { createContext } from 'react';
import { useImmerReducer } from "use-immer";
import axios from 'axios';

export const UserStore = createContext();

const initialState = {
    isLoaded: false,
    isLoading: false,
    isAuth: false,
    isReconnected: false,
    loadedText: "",
    isFailed: false,
    user: {
        id: "",
        name: "",
        email: "",
        hasProfile: false,
        tenantId: "",
        tenantName: "",
        tenantHasProfile: false
    },
    config: {},
    right: {},
    limit: {
        storageLimit: 0,
        fileCount: 0,
        fileSize: 0,
        userLimit: 0,
        userCount: 0
    }
};

function reducer(draft, action) {
    switch (action.type) {
        case 'GET_CONFIG':
            draft.isLoading = true;
            draft.isLoaded = false;
            draft.loadedText = "connecting...";
            draft.isFailed = false;
            return draft;
        case 'GET_CONFIG_SUCCESS':
            draft.isLoading = false;
            draft.isLoaded = true;

            if (action.payload.id) {
                draft.limit = { storageLimit: action.payload.storageLimit, fileCount: action.payload.fileCount, fileSize: action.payload.fileSize, userLimit: action.payload.userLimit, userCount: action.payload.userCount };
                draft.config = action.payload.config;
                draft.right = action.payload.right;
                draft.loadedText = "settings loaded";
                draft.isFailed = false;
            }
            else {
                draft.loadedText = action.payload.message;
                draft.isFailed = true;
            }

            return draft;
        case 'GET_CONFIG_FAILURE':
            draft.isLoading = false;
            draft.isLoaded = true;
            draft.loadedText = "failed to connect";
            draft.isFailed = true;
            return draft;
        case 'SET_CONFIG':
            return draft;
        case 'SET_CONFIG_SUCCESS':
            if (action.payload.success) {
                draft.config = action.payload.config;
                draft.loadedText = "config set";
                draft.isFailed = false;
            }
            else {
                draft.loadedText = action.payload.message;
                draft.isFailed = true;
            }

            return draft;
        case 'SET_CONFIG_FAILURE':
            draft.loadedText = "failed to connect";
            draft.isFailed = true;
            return draft;
        case 'LOGIN':
            draft.isLoading = true;
            draft.isLoaded = false;
            draft.loadedText = "logging in";
            draft.isFailed = false;
            return draft;
        case 'LOGIN_SUCCESS':
            draft.isLoading = false;
            draft.isLoaded = true;

            if (action.payload.id) {
                draft.user = action.payload.user;
                draft.config = action.payload.config;
                draft.right = action.payload.right;
                draft.loadedText = "login successful";
                draft.isAuth = true;
                draft.isFailed = false;

                axios.defaults.headers.common = { 'Authorization': "bearer " + action.payload.verification };
            }
            else {
                draft.isAuth = false;
                draft.loadedText = action.payload.message;
                draft.isFailed = true;
            }

            return draft;
        case 'LOGIN_FAILURE':
            draft.isLoading = false;
            draft.isLoaded = true;
            draft.loadedText = "failed to connect";
            draft.isFailed = true;
            return draft;
        case 'RECONNECT':
            draft.isLoading = true;
            draft.isLoaded = false;
            draft.loadedText = "reconnecting";
            draft.isFailed = false;
            return draft;
        case 'RECONNECT_SUCCESS':
            draft.isLoading = false;
            draft.isLoaded = true;

            if (action.payload.id) {
                draft.user = action.payload.user;
                draft.config = action.payload.config;
                draft.right = action.payload.right;
                draft.loadedText = "reconnected";
                draft.isAuth = true;
                draft.isFailed = false;

                axios.defaults.headers.common = { 'Authorization': "bearer " + action.payload.verification };
            }
            else {
                draft.isAuth = false;
                draft.loadedText = action.payload.message;
                draft.isFailed = true;
            }

            return draft;
        case 'RECONNECT_FAILURE':
            draft.isLoading = false;
            draft.isLoaded = true;
            draft.loadedText = "failed to connect";
            draft.isFailed = true;
            return draft;
        default:
            return draft;
    }
}

export function UserStoreProvider({ children }) {
    const [stateUser, dispatchUser] = useImmerReducer(reducer, initialState);
    const value = { stateUser, dispatchUser };
    return <UserStore.Provider value={value}>{children}</UserStore.Provider>;
}