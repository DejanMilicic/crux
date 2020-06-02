import { reducer, initialState } from "./ModelStore";

describe("<ModelStore />", () => {
  it("tests <ModelStore> with GET_MODEL action", () => {
    const action = {
      type: "GET_MODEL",
      payload: "identity-123",
      logicKey: "meeting"
    };

    const state = reducer(
      { ...initialState, stored: [{ logicKey: "else" }] },
      action
    );

    expect(state.status.isLoading).toEqual(true);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <ModelStore> with GET_MODEL_SUCCESS action", () => {
    const action = {
      type: "GET_MODEL_SUCCESS",
      payload: { id: "identity-123" },
      logicKey: "meeting"
    };

    const state = reducer(
      {
        ...initialState,
        stored: [{ logicId: "identity-123", logicKey: "meeting" }]
      },
      action
    );

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(true);
  });

  it("tests <ModelStore> with GET_MODEL_SUCCESS action - server failure", () => {
    const action = {
      type: "GET_MODEL_SUCCESS",
      payload: { message: "failed" },
      logicKey: "meeting"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <ModelStore> with GET_MODEL_FAILURE action - connect failure", () => {
    const action = {
      type: "GET_MODEL_FAILURE",
      payload: { message: "failed" },
      logicKey: "meeting"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <ModelStore> with SAVE_MODEL action - not stored", () => {
    const action = {
      type: "SAVE_MODEL",
      payload: { id: "identity-123", name: "test" },
      logicKey: "meeting"
    };

    const state = reducer(
      { ...initialState, stored: [{ logicKey: "else" }] },
      action
    );

    expect(state.status.isLoading).toEqual(true);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <ModelStore> with SAVE_MODEL action - stored", () => {
    const action = {
      type: "SAVE_MODEL",
      payload: { id: "identity-123", name: "test" },
      logicKey: "meeting"
    };

    const state = reducer(
      { ...initialState, stored: [{ logicKey: "meeting" }] },
      action
    );

    expect(state.status.isLoading).toEqual(true);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <ModelStore> with SAVE_MODEL_SUCCESS action", () => {
    const action = {
      type: "SAVE_MODEL_SUCCESS",
      payload: { id: "identity-123", success: true },
      logicKey: "meeting"
    };

    const state = reducer(
      {
        ...initialState,
        stored: [
          {
            logicId: "identity-123",
            logicKey: "meeting",
            model: { id: "identity-123" }
          }
        ]
      },
      action
    );

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(true);
  });

  it("tests <ModelStore> with SAVE_MODEL_SUCCESS action - with archive", () => {
    const action = {
      type: "SAVE_MODEL_SUCCESS",
      payload: { id: "identity-123", success: true },
      logicKey: "meeting"
    };

    const state = reducer(
      {
        ...initialState,
        stored: [
          {
            logicId: "identity-123",
            logicKey: "meeting",
            model: { id: "identity-123" }
          }
        ],
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

  it("tests <ModelStore> with SAVE_MODEL_SUCCESS action - server failure", () => {
    const action = {
      type: "SAVE_MODEL_SUCCESS",
      payload: { success: false, message: "failed" },
      logicKey: "meeting"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <ModelStore> with SAVE_MODEL_FAILURE action - connect failure", () => {
    const action = {
      type: "SAVE_MODEL_FAILURE",
      payload: { message: "failed" },
      logicKey: "meeting"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <ModelStore> with UPDATE_MODEL action - with stored", () => {
    const action = {
      type: "UPDATE_MODEL",
      payload: { id: "identity-123" },
      logicKey: "meeting"
    };

    const state = reducer(
      {
        ...initialState,
        stored: [
          {
            logicId: "identity-123",
            logicKey: "meeting",
            model: { id: "identity-123" }
          }
        ]
      },
      action
    );

    expect(state.stored.length).toEqual(1);
  });

  it("tests <ModelStore> with UPDATE_MODEL action - without stored", () => {
    const action = {
      type: "UPDATE_MODEL",
      payload: { id: "identity-123" },
      logicKey: "meeting"
    };

    const state = reducer(
      {
        ...initialState,
        stored: []
      },
      action
    );

    expect(state.stored.length).toEqual(1);
  });

  it("tests <ModelStore> with RESET_MODEL action", () => {
    const action = {
      type: "RESET_MODEL",
      logicKey: "meeting"
    };

    const state = reducer(
      { ...initialState, stored: [{ logicKey: "meeting" }] },
      action
    );

    expect(state.stored.length).toEqual(0);
  });

  it("tests <ModelStore> with wrong action", () => {
    const action = {
      type: "NONSENSE"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(false);
  });
});
