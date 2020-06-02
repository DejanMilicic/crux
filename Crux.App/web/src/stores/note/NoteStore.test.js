import { reducer, initialState } from "./NoteStore";

describe("<NoteStore />", () => {
  it("tests <NoteStore> with GET_NOTES action", () => {
    const action = {
      type: "GET_NOTES",
      id: "identity-123"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(true);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <NoteStore> with GET_NOTES_SUCCESS action - success", () => {
    const action = {
      type: "GET_NOTES_SUCCESS",
      payload: { notable: { id: "identity-123" }, notes: [] }
    };

    const state = reducer({ ...initialState, id: "identity-123" }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(true);
  });

  it("tests <NoteStore> with GET_NOTES_SUCCESS action - failure", () => {
    const action = {
      type: "GET_NOTES_SUCCESS",
      payload: { notable: {}, message: "failed" },
      logicKey: "meeting"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <NoteStore> with GET_NOTES_FAILURE action", () => {
    const action = {
      type: "GET_NOTES_FAILURE",
      payload: { message: "failed" }
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <NoteStore> with SAVE_NOTE action", () => {
    const action = {
      type: "SAVE_NOTE",
      id: "identity-123"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(true);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <NoteStore> with SAVE_NOTE_SUCCESS action - success", () => {
    const action = {
      type: "SAVE_NOTE_SUCCESS",
      payload: { notable: { id: "identity-123" }, notes: [{ id: "note-123" }] }
    };

    const state = reducer({ ...initialState, id: "identity-123" }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(true);
  });

  it("tests <NoteStore> with SAVE_NOTE_SUCCESS action - failure", () => {
    const action = {
      type: "SAVE_NOTE_SUCCESS",
      payload: { notable: {}, message: "failed" }
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <NoteStore> with SAVE_NOTE_FAILURE action", () => {
    const action = {
      type: "SAVE_NOTE_FAILURE",
      payload: { message: "failed" },
      logicKey: "meeting"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <NoteStore> with DELETE_NOTE action", () => {
    const action = {
      type: "DELETE_NOTE",
      id: "identity-123"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(true);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <NoteStore> with DELETE_NOTE_SUCCESS action - success", () => {
    const action = {
      type: "DELETE_NOTE_SUCCESS",
      payload: {
        notable: { id: "identity-123" },
        notes: [{ id: "note-123" }]
      }
    };

    const state = reducer({ ...initialState, id: "identity-123" }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(true);
  });

  it("tests <NoteStore> with DELETE_NOTE_SUCCESS action - failure", () => {
    const action = {
      type: "DELETE_NOTE_SUCCESS",
      payload: { notable: {}, message: "failed" }
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <NoteStore> with DELETE_NOTE_FAILURE action", () => {
    const action = {
      type: "DELETE_NOTE_FAILURE",
      payload: { message: "failed" },
      logicKey: "meeting"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(true);
    expect(state.status.isLoaded).toEqual(false);
  });

  it("tests <NoteStore> with wrong action", () => {
    const action = {
      type: "NONSENSE"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.status.isLoading).toEqual(false);
    expect(state.status.isFailed).toEqual(false);
    expect(state.status.isLoaded).toEqual(false);
  });
});
