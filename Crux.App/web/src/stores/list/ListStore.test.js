import { reducer, initialState } from "./ListStore";

describe("<ListStore />", () => {
  it("tests <ListStore> with GET_FILTER action", () => {
    const action = {
      type: "GET_FILTER",
      payload: { search: "freetext" },
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

  it("tests <ListStore> with GET_FILTER_SUCCESS action - success ok", () => {
    const action = {
      type: "GET_FILTER_SUCCESS",
      payload: { success: true, data: [] }
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(true);
  });

  it("tests <ListStore> with GET_FILTER_SUCCESS action - server failure", () => {
    const action = {
      type: "GET_FILTER_SUCCESS",
      payload: { success: false, message: "failed" }
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <ListStore> with GET_FILTER_FAILURE action", () => {
    const action = {
      type: "GET_FILTER_FAILURE",
      payload: { message: "failed" }
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <ListStore> with UPDATE_PARAMS action", () => {
    const search = "else";

    const action = {
      type: "UPDATE_PARAMS",
      payload: { search }
    };

    const state = reducer({ ...initialState }, action);

    expect(state.params.search).toEqual(search);
  });

  it("tests <ListStore> with RESET_FILTER action", () => {
    const action = {
      type: "RESET_FILTER",
      payload: { take: 10 }
    };

    const state = reducer({ ...initialState }, action);

    expect(state.params).toEqual(initialState.params);
  });

  it("tests <ListStore> with TOGGLE_FAV_SUCCESS action - set true", () => {
    const action = {
      type: "TOGGLE_FAV_SUCCESS",
      payload: true,
      logicId: "meeting-123",
      logicKey: "meeting"
    };

    const state = reducer(
      {
        ...initialState,
        list: {
          data: [{ id: "meeting-123", logicKey: "meeting", favourite: false }]
        }
      },
      action
    );

    expect(state.list.data[0].favourite).toEqual(true);
  });

  it("tests <ListStore> with TOGGLE_FAV_SUCCESS action - set true", () => {
    const action = {
      type: "TOGGLE_FAV_SUCCESS",
      payload: false,
      logicId: "meeting-123",
      logicKey: "meeting"
    };

    const state = reducer(
      {
        ...initialState,
        list: {
          data: [{ id: "meeting-123", logicKey: "meeting", favourite: true }]
        }
      },
      action
    );

    expect(state.list.data[0].favourite).toEqual(false);
  });

  it("tests <ListStore> with TOGGLE_FAV_FAILURE action", () => {
    const action = {
      type: "TOGGLE_FAV_FAILURE",
      payload: { message: "failed" }
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <ListStore> with wrong action", () => {
    const action = {
      type: "NONSENSE"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(false);
  });
});
