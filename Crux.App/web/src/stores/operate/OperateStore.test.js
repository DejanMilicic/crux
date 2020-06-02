import { reducer, initialState } from "./OperateStore";

describe("<OperateStore />", () => {
  it("tests <OperateStore> with OPERATE action", () => {
    const action = {
      type: "OPERATE",
      payload: "identity-123",
      logicKey: "meeting",
      operation: "activate"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(true);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <OperateStore> with OPERATE_SUCCESS action - success", () => {
    const action = {
      type: "OPERATE_SUCCESS",
      payload: { success: true, identity: "identity-123" }
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(true);
  });

  it("tests <OperateStore> with OPERATE_SUCCESS action - failure", () => {
    const action = {
      type: "OPERATE_SUCCESS",
      payload: { success: false, message: "failed" }
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <OperateStore> with OPERATE_SUCCESS action - failure no payload", () => {
    const action = {
      type: "OPERATE_SUCCESS"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <OperateStore> with OPERATE_FAILURE action", () => {
    const action = {
      type: "OPERATE_FAILURE",
      payload: { message: "failed" }
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <OperateStore> with wrong action", () => {
    const action = {
      type: "NONSENSE"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(false);
  });
});
