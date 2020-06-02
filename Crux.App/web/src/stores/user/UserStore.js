import React, { createContext } from "react";
import PropTypes from "prop-types";
import { useImmerReducer } from "use-immer";
import axios from "axios";
import { initial, loaded, loading, failed } from "stores";

export const UserStore = createContext();

export const initialState = {
  status: initial(),
  isAuth: false,
  isReconnected: false,
  isWelcome: false,
  isForget: false,
  isTwoFactor: false,
  user: {
    id: "",
    name: "",
    email: "",
    hasProfile: false,
    hasPhone: false,
    tenantId: "",
    tenantName: "",
    tenantHasProfile: false,
  },
  config: {},
  right: {},
  limit: {
    storageLimit: 0,
    fileCount: 0,
    fileSize: 0,
    userLimit: 0,
    userCount: 0,
  },
  forgot: {
    hasCode: false,
    hasReply: false,
    email: "",
    code: "",
    reset: "",
  },
  signup: {
    tenantId: "",
    tenantName: "",
    entryKey: "",
  },
};

export function reducer(draft, action) {
  switch (action.type) {
    case "GET_CONFIG":
      draft.status = loading();
      return draft;
    case "GET_CONFIG_SUCCESS":
      if (action.payload.id) {
        draft.limit = {
          storageLimit: action.payload.storageLimit,
          fileCount: action.payload.fileCount,
          fileSize: action.payload.fileSize,
          userLimit: action.payload.userLimit,
          userCount: action.payload.userCount,
        };
        draft.config = action.payload.config;
        draft.right = action.payload.right;
        draft.status = loaded();
      } else {
        draft.status = failed(action.payload.message);
      }

      return draft;
    case "SET_CONFIG":
      return draft;
    case "SET_CONFIG_SUCCESS":
      if (action.payload.success) {
        draft.config = action.payload.config;
        draft.status = loaded();
      } else {
        draft.status = failed(action.payload.message);
      }

      return draft;
    case "LOGIN":
      draft.status = loading();
      return draft;
    case "LOGIN_SUCCESS":
      if (action.payload.id) {
        draft.isAuth = true;
        draft.status = loaded();

        if (action.payload.isTwoFactor) {
          draft.isTwoFactor = true;
          draft.user = { id: action.payload.id };
        } else {
          draft.user = action.payload.user;
          draft.config = action.payload.config;
          draft.right = action.payload.right;

          axios.defaults.headers.common = {
            Authorization: "bearer " + action.payload.verification,
          };
          localStorage.setItem("verification", action.payload.verification);
          localStorage.setItem("key", action.payload.key);
          localStorage.setItem("id", action.payload.id);

          if (action.payload.rememberMe) {
            localStorage.setItem("expiry", addHours(168));
          } else {
            localStorage.setItem("expiry", addHours(1));
          }
        }
      } else {
        draft.isAuth = false;
        draft.isReconnected = false;
        draft.status = failed(action.payload.message);
      }

      return draft;
    case "RECONNECT":
      draft.status = loading();
      return draft;
    case "RECONNECT_SUCCESS":
      if (action.payload.id) {
        draft.user = action.payload.user;
        draft.config = action.payload.config;
        draft.right = action.payload.right;
        draft.status = loaded();
        draft.isAuth = true;

        axios.defaults.headers.common = {
          Authorization: "bearer " + action.payload.verification,
        };
        localStorage.setItem("verification", action.payload.verification);

        if (!action.payload.rememberMe) {
          localStorage.setItem("expiry", addHours(1));
        }
      } else {
        localStorage.setItem("verification", "");
        localStorage.setItem("key", "");
        localStorage.setItem("id", "");
        localStorage.setItem("expiry", new Date());

        draft.isAuth = false;
        draft.isReconnected = false;
        draft.status = failed(action.payload.message);
      }

      return draft;
    case "LOGOUT":
      localStorage.setItem("verification", "");
      localStorage.setItem("key", "");
      localStorage.setItem("id", "");
      localStorage.setItem("expiry", new Date());
      return { ...initialState };
    case "SIGNUP":
      draft.status = loading();
      return draft;
    case "SIGNUP_SUCCESS":
      if (action.payload.success) {
        draft.user = action.payload.user;
        draft.config = action.payload.config;
        draft.right = action.payload.right;
        draft.status = loaded();
        draft.isAuth = true;

        axios.defaults.headers.common = {
          Authorization: "bearer " + action.payload.verification,
        };

        localStorage.setItem("verification", action.payload.verification);
        localStorage.setItem("key", action.payload.key);
        localStorage.setItem("id", action.payload.id);
        localStorage.setItem("expiry", addHours(1));
      } else {
        draft.isAuth = false;
        draft.isReconnected = false;
        draft.status = failed(action.payload.message);
      }

      return draft;
    case "ENTRYKEY":
      draft.status = loading();
      return draft;
    case "ENTRYKEY_SUCCESS":
      if (action.payload.tenantId) {
        draft.signup.tenantId = action.payload.tenantId;
        draft.signup.tenantName = action.payload.tenantName;
        draft.signup.entryKey = action.payload.entryKey;
        draft.status = loaded();
      } else {
        draft.status = failed(action.payload.message);
      }

      return draft;
    case "FORGET_SET":
      draft.isForget = true;
      return draft;
    case "FORGET_END":
      draft.status = loaded();
      draft.isForget = false;
      draft.forgot = {
        hasCode: false,
        hasReply: false,
        email: "",
        code: "",
        reset: "",
      };

      return draft;
    case "FORGET_CODE":
      draft.status = loading();
      return draft;
    case "FORGET_CODE_SUCCESS":
      if (action.payload.success) {
        draft.forgot.hasCode = true;
        draft.forgot.email = action.payload.email;
        draft.forgot.code = action.payload.code;
        draft.status = loaded();
      } else {
        draft.status = failed(action.payload.message);
      }

      return draft;
    case "FORGET_REPLY":
      draft.status = loading();
      return draft;
    case "FORGET_REPLY_SUCCESS":
      if (action.payload.success) {
        draft.forgot.hasReply = true;
        draft.forgot.code = action.payload.code;
        draft.forgot.reset = action.payload.resetCode;
        draft.status = loaded();
      } else {
        draft.status = failed(action.payload.message);
      }

      return draft;
    case "FORGET_RESET":
      draft.status = loading();
      return draft;
    case "FORGET_RESET_SUCCESS":
      if (action.payload.success) {
        draft.user = action.payload.user;
        draft.config = action.payload.config;
        draft.right = action.payload.right;
        draft.status = loaded();
        draft.isAuth = true;

        axios.defaults.headers.common = {
          Authorization: "bearer " + action.payload.verification,
        };
        localStorage.setItem("verification", action.payload.verification);
        localStorage.setItem("key", action.payload.key);
        localStorage.setItem("id", action.payload.id);
        localStorage.setItem("expiry", addHours(1));

        draft.isForget = false;
        draft.forgot = {
          hasCode: false,
          hasReply: false,
          email: "",
          code: "",
          reset: "",
        };
      } else {
        draft.isAuth = false;
        draft.isReconnected = false;
        draft.status = failed(action.payload.message);
      }

      return draft;
    case "TWO_FACTOR_REPLY":
      draft.status = loading();
      return draft;
    case "TWO_FACTOR_REPLY_SUCCESS":
      if (action.payload.success) {
        draft.user = action.payload.user;
        draft.config = action.payload.config;
        draft.right = action.payload.right;
        draft.status = loaded();
        draft.isAuth = true;
        draft.isTwoFactor = false;

        axios.defaults.headers.common = {
          Authorization: "bearer " + action.payload.verification,
        };
        localStorage.setItem("verification", action.payload.verification);
        localStorage.setItem("key", action.payload.key);
        localStorage.setItem("id", action.payload.id);

        if (action.payload.rememberMe) {
          localStorage.setItem("expiry", addHours(168));
        } else {
          localStorage.setItem("expiry", addHours(1));
        }
      } else {
        draft.isAuth = false;
        draft.isReconnected = false;
        draft.status = failed(action.payload.message);
      }

      return draft;
    case "GET_CONFIG_FAILURE":
      draft.status = failed(action.payload.message);
      return draft;
    case "SET_CONFIG_FAILURE":
      draft.status = failed(action.payload.message);
      return draft;
    case "LOGIN_FAILURE":
      draft.status = failed(action.payload.message);
      draft.isAuth = false;
      draft.isReconnected = false;
      return draft;
    case "RECONNECT_FAILURE":
      localStorage.setItem("verification", "");
      localStorage.setItem("key", "");
      localStorage.setItem("id", "");
      localStorage.setItem("expiry", new Date());

      draft.status = failed(action.payload.message);
      draft.isAuth = false;
      draft.isReconnected = false;
      return draft;
    case "SIGNUP_FAILURE":
      draft.status = failed(action.payload.message);
      draft.isAuth = false;
      draft.isReconnected = false;
      return draft;
    case "ENTRYKEY_FAILURE":
      draft.status = failed(action.payload.message);
      return draft;
    case "FORGET_CODE_FAILURE":
      draft.status = failed(action.payload.message);
      return draft;
    case "FORGET_REPLY_FAILURE":
      draft.status = failed(action.payload.message);
      return draft;
    case "FORGET_RESET_FAILURE":
      draft.status = failed(action.payload.message);
      return draft;
    case "TWO_FACTOR_REPLY_FAILURE":
      draft.status = failed(action.payload.message);
      draft.isAuth = false;
      draft.isReconnected = false;
      return draft;
    default:
      return draft;
  }
}

export function UserStoreProvider({ children }) {
  const [stateUser, dispatchUser] = useImmerReducer(reducer, {
    ...initialState,
  });
  const value = { stateUser, dispatchUser };
  return <UserStore.Provider value={value}>{children}</UserStore.Provider>;
}

UserStoreProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

function addHours(hours) {
  var now = new Date();
  now.setHours(now.getHours() + hours);
  return now;
}
