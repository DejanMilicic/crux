import { reducer, initialState } from "./DeleteStore";

describe("<DeleteStore />", () => {
  it("tests <DeleteStore> with GET_DELETE action", () => {
    const action = {
      type: "GET_DELETE"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(true);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <DeleteStore> with GET_DELETE_SUCCESS action - success", () => {
    const action = {
      type: "GET_DELETE_SUCCESS",
      payload: { success: true, identity: "identity-123" },
      logicKey: "meeting"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(true);
  });

  it("tests <DeleteStore> with GET_DELETE_SUCCESS action - failure", () => {
    const action = {
      type: "GET_DELETE_SUCCESS",
      payload: { success: false, message: "failed" },
      logicKey: "meeting"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <DeleteStore> with GET_DELETE_SUCCESS action - with Archive", () => {
    const action = {
      type: "GET_DELETE_SUCCESS",
      payload: { success: true, id: "identity-123" },
      logicKey: "meeting"
    };

    const state = reducer(
      {
        ...initialState,
        archive: [
          { logicKey: "meeting", logicId: "0" },
          { logicKey: "meeting", logicId: "1" },
          { logicKey: "meeting", logicId: "2" },
          { logicKey: "meeting", logicId: "3" },
          { logicKey: "meeting", logicId: "4" },
          { logicKey: "meeting", logicId: "5" }
        ]
      },
      action
    );

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(true);
  });

  it("tests <DeleteStore> with GET_DELETE_FAILURE action", () => {
    const action = {
      type: "GET_DELETE_FAILURE",
      payload: { message: "failed" },
      logicKey: "meeting"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <DeleteStore> with RESET_ARCHIVE action", () => {
    const action = {
      type: "RESET_ARCHIVE"
    };

    const state = reducer(
      { ...initialState, archive: [{ logicKey: "meeting", logicId: "0" }] },
      action
    );

    expect(state.archive.length).toEqual(0);
  });

  it("tests <DeleteStore> with wrong action", () => {
    const action = {
      type: "NONSENSE"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(false);
  });
});
