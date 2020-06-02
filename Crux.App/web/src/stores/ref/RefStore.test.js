import { reducer, initialState } from "./RefStore";

describe("<RefStore />", () => {
  it("tests <RefStore> with GET_REF action", () => {
    const action = {
      type: "GET_REF",
      payload: { search: "test" },
      logicKey: "meeting"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.stored[0].status.isLoading).toEqual(true);
    expect(state.stored[0].status.isFailed).toEqual(false);
    expect(state.stored[0].status.isLoaded).toEqual(false);
  });

  it("tests <RefStore> with GET_REF action - existing list", () => {
    const action = {
      type: "GET_REF",
      payload: { search: "test" },
      logicKey: "meeting"
    };

    const state = reducer(
      {
        ...initialState,
        stored: [
          {
            logicId: "identity-123",
            logicKey: "meeting",
            model: [{ id: "identity-123", name: "name" }]
          }
        ]
      },
      action
    );

    expect(state.stored[0].status.isLoading).toEqual(true);
    expect(state.stored[0].status.isFailed).toEqual(false);
    expect(state.stored[0].status.isLoaded).toEqual(false);
  });

  it("tests <RefStore> with GET_REF_SUCCESS action", () => {
    const action = {
      type: "GET_REF_SUCCESS",
      payload: { success: true, model: [{ id: "identity-123", name: "name" }] },
      logicKey: "meeting"
    };

    const state = reducer(
      {
        ...initialState,
        stored: [
          {
            logicId: "identity-123",
            logicKey: "meeting",
            model: [{ id: "identity-123", name: "name" }]
          }
        ]
      },
      action
    );

    expect(state.stored[0].status.isLoading).toEqual(false);
    expect(state.stored[0].status.isFailed).toEqual(false);
    expect(state.stored[0].status.isLoaded).toEqual(true);
  });

  it("tests <RefStore> with GET_REF_SUCCESS action - server failure", () => {
    const action = {
      type: "GET_REF_SUCCESS",
      payload: { message: "failed" },
      logicKey: "meeting"
    };

    const state = reducer(
      {
        ...initialState,
        stored: [
          {
            logicId: "identity-123",
            logicKey: "meeting",
            model: [{ id: "identity-123", name: "name" }]
          }
        ]
      },
      action
    );

    expect(state.stored[0].status.isLoading).toEqual(false);
    expect(state.stored[0].status.isFailed).toEqual(true);
    expect(state.stored[0].status.isLoaded).toEqual(false);
  });

  it("tests <RefStore> with GET_REF_FAILURE action - connect failure", () => {
    const action = {
      type: "GET_REF_FAILURE",
      payload: { message: "failed" },
      logicKey: "meeting"
    };

    const state = reducer(
      {
        ...initialState,
        stored: [
          {
            logicId: "identity-123",
            logicKey: "meeting",
            model: [{ id: "identity-123", name: "name" }]
          }
        ]
      },
      action
    );

    expect(state.stored[0].status.isLoading).toEqual(false);
    expect(state.stored[0].status.isFailed).toEqual(true);
    expect(state.stored[0].status.isLoaded).toEqual(false);
  });

  it("tests <RefStore> with RESET_REF action", () => {
    const action = { type: "RESET_REF" };
    const state = reducer({ ...initialState }, action);
    expect(state.stored.length).toEqual(0);
  });

  it("tests <RefStore> with wrong action", () => {
    const action = {
      type: "NONSENSE"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.stored.length).toEqual(1);
  });
});
