import { reducer, initialState } from "./LoaderStore";

const file = {
  name: "test.png",
  size: 5678,
  type: "image/png"
};

describe("<LoaderStore />", () => {
  it("tests <LoaderStore> with FILE_LOAD action - valid file", () => {
    const action = {
      type: "FILE_LOAD",
      payload: { ...file }
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(true);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <LoaderStore> with FILE_LOAD action - missing file", () => {
    const action = {
      type: "FILE_LOAD",
      payload: null
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <LoaderStore> with FILE_LOAD_SUCCESS action - success ok", () => {
    const action = {
      type: "FILE_LOAD_SUCCESS",
      payload: {
        id: "ok-123",
        thumbUrl: "https://imghost.com/file.png"
      },
      name: file.name
    };

    const state = reducer({ ...initialState, files: [file] }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(true);
  });

  it("tests <LoaderStore> with FILE_LOAD_SUCCESS action - server failure", () => {
    const action = {
      type: "FILE_LOAD_SUCCESS",
      payload: { message: "failed" }
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <LoaderStore> with FILE_LOAD_FAILURE action", () => {
    const action = {
      type: "FILE_LOAD_FAILURE",
      payload: { message: "failed" }
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <LoaderStore> with QUEUE_START action", () => {
    const action = {
      type: "QUEUE_START",
      payload: file.name
    };

    const state = reducer(
      { ...initialState, files: [{ ...file, isLoaded: false }] },
      action
    );

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(true);
  });

  it("tests <LoaderStore> with QUEUE_START action - failed to find in queue", () => {
    const action = {
      type: "QUEUE_START",
      payload: "missing"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <LoaderStore> with QUEUE_START action - missing file", () => {
    const action = {
      type: "QUEUE_START",
      payload: null
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <LoaderStore> with QUEUE_BATCH action", () => {
    const action = {
      type: "QUEUE_BATCH",
      payload: [file]
    };

    const state = reducer({ ...initialState, files: [] }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(true);
  });

  it("tests <LoaderStore> with QUEUE_BATCH action - failed missing files", () => {
    const action = {
      type: "QUEUE_BATCH",
      payload: []
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <LoaderStore> with RESET_LOADER action", () => {
    const action = {
      type: "RESET_LOADER"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.files).toEqual([]);
  });

  it("tests <LoaderStore> with GET_GIF_SUCCESS action", () => {
    const action = {
      type: "GET_GIF_SUCCESS",
      payload: "search"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.gif).toEqual("search");
  });

  it("tests <LoaderStore> with GET_GIF_SUCCESS action - for default", () => {
    const action = {
      type: "GET_GIF_SUCCESS",
      payload: null
    };

    const state = reducer({ ...initialState }, action);

    expect(state.gif).toEqual("https://ourdefaultgif.com/gif");
  });

  it("tests <LoaderStore> with GET_GIF_FAILURE action - for default", () => {
    const action = {
      type: "GET_GIF_FAILURE"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.gif).toEqual("https://ourdefaultgif.com/gif");
  });

  it("tests <LoaderStore> with wrong action", () => {
    const action = {
      type: "NONSENSE"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(false);
  });
});
