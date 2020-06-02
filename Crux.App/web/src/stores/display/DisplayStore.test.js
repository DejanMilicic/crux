import { reducer, initialState } from "./DisplayStore";

describe("<DisplayStore />", () => {
  it("tests <DisplayStore> with GET_DISPLAY action", () => {
    const action = {
      type: "GET_DISPLAY",
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

  it("tests <DisplayStore> with GET_DISPLAY_SUCCESS action - without Archive", () => {
    const action = {
      type: "GET_DISPLAY_SUCCESS",
      payload: { id: "identity-123" },
      logicKey: "meeting"
    };

    const state = reducer(
      { ...initialState, stored: [{ logicKey: "meeting" }] },
      action
    );

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(true);
  });

  it("tests <DisplayStore> with GET_DISPLAY_SUCCESS action - server failure", () => {
    const action = {
      type: "GET_DISPLAY_SUCCESS",
      payload: { message: "failed" },
      logicKey: "meeting"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <DisplayStore> with GET_DISPLAY_SUCCESS action - with Archive", () => {
    const action = {
      type: "GET_DISPLAY_SUCCESS",
      payload: { id: "identity-123" },
      logicKey: "meeting"
    };

    const state = reducer(
      {
        ...initialState,
        stored: [{ logicKey: "meeting" }],
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

  it("tests <DisplayStore> with GET_DISPLAY_FAILURE action", () => {
    const action = {
      type: "GET_DISPLAY_FAILURE",
      payload: { message: "failed" },
      logicKey: "meeting"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <DisplayStore> with SET_DISPLAY action - without stored", () => {
    const action = {
      type: "SET_DISPLAY",
      payload: { id: "identity-123" },
      logicKey: "meeting"
    };

    const state = reducer({ ...initialState, stored: [] }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(true);
  });

  it("tests <DisplayStore> with SET_DISPLAY action - with stored", () => {
    const action = {
      type: "SET_DISPLAY",
      payload: { id: "identity-123" },
      logicKey: "meeting"
    };

    const state = reducer(
      {
        ...initialState,
        stored: [{ logicKey: "meeting" }],
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

  it("tests <DisplayStore> with SET_DISPLAY action - server failure", () => {
    const action = {
      type: "SET_DISPLAY",
      payload: { message: "failed" },
      logicKey: "meeting"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <DisplayStore> with RESET_DISPLAY action", () => {
    const action = {
      type: "RESET_DISPLAY",
      logicKey: "meeting"
    };

    const state = reducer(
      { ...initialState, stored: [{ logicKey: "meeting" }] },
      action
    );

    expect(state.stored.length).toEqual(0);
  });

  it("tests <DisplayStore> with TOGGLE_FAV_SUCCESS action - set true", () => {
    const action = {
      type: "TOGGLE_FAV_SUCCESS",
      payload: true,
      logicKey: "meeting"
    };

    const state = reducer(
      {
        ...initialState,
        stored: [{ logicKey: "meeting", current: { favourite: true } }]
      },
      action
    );

    expect(state.stored[0].current.favourite).toEqual(true);
  });

  it("tests <DisplayStore> with TOGGLE_FAV_SUCCESS action - set false", () => {
    const action = {
      type: "TOGGLE_FAV_SUCCESS",
      payload: false,
      logicKey: "meeting"
    };

    const state = reducer(
      {
        ...initialState,
        stored: [{ logicKey: "meeting", current: { favourite: true } }]
      },
      action
    );

    expect(state.stored[0].current.favourite).toEqual(false);
  });

  it("tests <DisplayStore> with TOGGLE_FAV_FAILURE action", () => {
    const action = {
      type: "TOGGLE_FAV_FAILURE",
      payload: { message: "failed" }
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <DisplayStore> with wrong action", () => {
    const action = {
      type: "NONSENSE"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(false);
  });
});
