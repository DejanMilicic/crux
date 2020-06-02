import { reducer, initialState } from "./UserStore";

describe("<UserStore />", () => {
  it("tests <UserStore> with GET_CONFIG action", () => {
    const action = {
      type: "GET_CONFIG",
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(true);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <UserStore> with GET_CONFIG_SUCCESS action", () => {
    const action = {
      type: "GET_CONFIG_SUCCESS",
      payload: {
        id: "identity-123",
        storageLimit: 10,
        fileCount: 11,
        fileSize: 12,
        userLimit: 13,
        userCount: 14,
        config: {},
        right: {},
      },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(true);
  });

  it("tests <UserStore> with GET_CONFIG_SUCCESS action - server failure", () => {
    const action = {
      type: "GET_CONFIG_SUCCESS",
      payload: { message: "failed" },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <UserStore> with GET_CONFIG_FAILURE action - connect failure", () => {
    const action = {
      type: "GET_CONFIG_FAILURE",
      payload: { message: "failed" },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <UserStore> with SET_CONFIG action", () => {
    const action = { type: "SET_CONFIG" };
    reducer({ ...initialState }, action);
  });

  it("tests <UserStore> with SET_CONFIG_SUCCESS action", () => {
    const action = {
      type: "SET_CONFIG_SUCCESS",
      payload: { success: true, config: {} },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(true);
  });

  it("tests <UserStore> with SET_CONFIG_SUCCESS action - failed", () => {
    const action = {
      type: "SET_CONFIG_SUCCESS",
      payload: { success: false, config: {} },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <UserStore> with SET_CONFIG_FAILURE action", () => {
    const action = {
      type: "SET_CONFIG_FAILURE",
      payload: { message: "failed" },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <UserStore> with LOGIN action", () => {
    const action = {
      type: "LOGIN",
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(true);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <UserStore> with LOGIN_SUCCESS action", () => {
    const action = {
      type: "LOGIN_SUCCESS",
      payload: {
        id: "identity-123",
        user: {},
        config: {},
        right: {},
        verification: "xyx",
        rememberMe: false,
      },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(true);
  });

  it("tests <UserStore> with LOGIN_SUCCESS action - twoFactor", () => {
    const action = {
      type: "LOGIN_SUCCESS",
      payload: {
        id: "identity-123",
        isTwoFactor: true,
      },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(true);
  });

  it("tests <UserStore> with LOGIN_SUCCESS action - with rememberMe", () => {
    const action = {
      type: "LOGIN_SUCCESS",
      payload: {
        id: "identity-123",
        user: {},
        config: {},
        right: {},
        verification: "xyx",
        rememberMe: true,
      },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(true);
  });

  it("tests <UserStore> with LOGIN_SUCCESS action - server failure", () => {
    const action = {
      type: "LOGIN_SUCCESS",
      payload: { message: "failed" },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <UserStore> with LOGIN_FAILURE action - connect failure", () => {
    const action = {
      type: "LOGIN_FAILURE",
      payload: { message: "failed" },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <UserStore> with RECONNECT action", () => {
    const action = {
      type: "RECONNECT",
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(true);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <UserStore> with RECONNECT_SUCCESS action", () => {
    const action = {
      type: "RECONNECT_SUCCESS",
      payload: {
        id: "identity-123",
        user: {},
        config: {},
        right: {},
        verification: "xyx",
        rememberMe: false,
      },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(true);
  });

  it("tests <UserStore> with RECONNECT_SUCCESS action - server failure", () => {
    const action = {
      type: "RECONNECT_SUCCESS",
      payload: { message: "failed" },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <UserStore> with RECONNECT_FAILURE action - connect failure", () => {
    const action = {
      type: "RECONNECT_FAILURE",
      payload: { message: "failed" },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <UserStore> with LOGOUT action", () => {
    const action = {
      type: "LOGOUT",
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <UserStore> with SIGNUP action", () => {
    const action = {
      type: "SIGNUP",
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(true);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <UserStore> with SIGNUP_SUCCESS action", () => {
    const action = {
      type: "SIGNUP_SUCCESS",
      payload: {
        user: {},
        config: {},
        right: {},
        verification: "xyx",
        rememberMe: false,
        success: true,
      },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(true);
  });

  it("tests <UserStore> with SIGNUP_SUCCESS action - server failure", () => {
    const action = {
      type: "SIGNUP_SUCCESS",
      payload: { message: "failed" },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <UserStore> with SIGNUP_FAILURE action - connect failure", () => {
    const action = {
      type: "SIGNUP_FAILURE",
      payload: { message: "failed" },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <UserStore> with ENTRYKEY action", () => {
    const action = {
      type: "ENTRYKEY",
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(true);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <UserStore> with ENTRYKEY_SUCCESS action", () => {
    const action = {
      type: "ENTRYKEY_SUCCESS",
      payload: {
        tenantId: "xyz",
        tenantName: "Dave",
        entryKey: "ytr",
      },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(true);
  });

  it("tests <UserStore> with ENTRYKEY_SUCCESS action - server failure", () => {
    const action = {
      type: "ENTRYKEY_SUCCESS",
      payload: { message: "failed" },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <UserStore> with ENTRYKEY_FAILURE action - connect failure", () => {
    const action = {
      type: "ENTRYKEY_FAILURE",
      payload: { message: "failed" },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <UserStore> with FORGET_CODE action", () => {
    const action = {
      type: "FORGET_CODE",
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(true);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <UserStore> with FORGET_CODE_SUCCESS action", () => {
    const action = {
      type: "FORGET_CODE_SUCCESS",
      payload: {
        success: true,
        email: "test@test.com",
        code: "xyz",
      },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(true);
  });

  it("tests <UserStore> with FORGET_CODE_SUCCESS action - server failure", () => {
    const action = {
      type: "FORGET_CODE_SUCCESS",
      payload: { message: "failed" },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <UserStore> with FORGET_CODE_FAILURE action - connect failure", () => {
    const action = {
      type: "FORGET_CODE_FAILURE",
      payload: { message: "failed" },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <UserStore> with FORGET_REPLY action", () => {
    const action = {
      type: "FORGET_REPLY",
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(true);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <UserStore> with FORGET_REPLY_SUCCESS action", () => {
    const action = {
      type: "FORGET_REPLY_SUCCESS",
      payload: {
        success: true,
        reset: "123",
        code: "xyz",
      },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(true);
  });

  it("tests <UserStore> with FORGET_REPLY_SUCCESS action - server failure", () => {
    const action = {
      type: "FORGET_REPLY_SUCCESS",
      payload: { message: "failed" },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <UserStore> with FORGET_REPLY_FAILURE action - connect failure", () => {
    const action = {
      type: "FORGET_REPLY_FAILURE",
      payload: { message: "failed" },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <UserStore> with FORGET_RESET action", () => {
    const action = {
      type: "FORGET_RESET",
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(true);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <UserStore> with FORGET_RESET_SUCCESS action", () => {
    const action = {
      type: "FORGET_RESET_SUCCESS",
      payload: {
        user: {},
        config: {},
        right: {},
        verification: "xyx",
        rememberMe: false,
        success: true,
      },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(true);
  });

  it("tests <UserStore> with FORGET_RESET_SUCCESS action - server failure", () => {
    const action = {
      type: "FORGET_RESET_SUCCESS",
      payload: { message: "failed" },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <UserStore> with FORGET_RESET_FAILURE action - connect failure", () => {
    const action = {
      type: "FORGET_RESET_FAILURE",
      payload: { message: "failed" },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <UserStore> with TWO_FACTOR_REPLY action", () => {
    const action = {
      type: "TWO_FACTOR_REPLY",
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(true);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <UserStore> with TWO_FACTOR_REPLY_SUCCESS action", () => {
    const action = {
      type: "TWO_FACTOR_REPLY_SUCCESS",
      payload: {
        success: true,
        user: {},
        config: {},
        right: {},
        verification: "xyx",
        rememberMe: false,
      },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(true);
  });

  it("tests <UserStore> with TWO_FACTOR_REPLY_SUCCESS action - with rememberMe", () => {
    const action = {
      type: "TWO_FACTOR_REPLY_SUCCESS",
      payload: {
        success: true,
        user: {},
        config: {},
        right: {},
        verification: "xyx",
        rememberMe: true,
      },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(true);
  });

  it("tests <UserStore> with TWO_FACTOR_REPLY_SUCCESS action - server failure", () => {
    const action = {
      type: "TWO_FACTOR_REPLY_SUCCESS",
      payload: { message: "failed" },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <UserStore> with TWO_FACTOR_REPLY_FAILURE action - connect failure", () => {
    const action = {
      type: "TWO_FACTOR_REPLY_FAILURE",
      payload: { message: "failed" },
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <UserStore> with FORGET_SET action", () => {
    const action = {
      type: "FORGET_SET",
    };

    const state = reducer({ ...initialState }, action);
    expect(state.isForget).toEqual(true);
  });

  it("tests <UserStore> with FORGET_END action", () => {
    const action = {
      type: "FORGET_END",
    };

    const state = reducer({ ...initialState }, action);
    expect(state.isForget).toEqual(false);
  });

  it("tests <UserStore> with wrong action", () => {
    const action = {
      type: "NONSENSE",
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(false);
  });
});
