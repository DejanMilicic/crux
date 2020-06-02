import { reducer, initialState } from "./DashStore";

describe("<DashStore />", () => {
  it("tests <DashStore> with GET_DASH action", () => {
    const action = {
      type: "GET_DASH",
      payload: "identity-123",
      logicKey: "dash",
      operation: "home"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(true);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <DashStore> with GET_DASH_SUCCESS action - success", () => {
    const action = {
      type: "GET_DASH_SUCCESS",
      payload: { success: true, data: {} }
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(true);
  });

  it("tests <DashStore> with GET_DASH_SUCCESS action - failure", () => {
    const action = {
      type: "GET_DASH_SUCCESS",
      payload: { success: false, message: "failed" },
      logicKey: "dash"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <DashStore> with GET_DASH_FAILURE action", () => {
    const action = {
      type: "GET_DASH_FAILURE",
      payload: { message: "failed" },
      logicKey: "meeting"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <DashStore> with wrong action", () => {
    const action = {
      type: "NONSENSE"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(false);
  });
});
