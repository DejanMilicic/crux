import { reducer, initialState } from "./RetainStore";

describe("<RetainStore />", () => {
  it("tests <RetainStore> with OPEN_RETAIN action - no retain", () => {
    const action = {
      type: "OPEN_RETAIN",
      payload: { logicKey: "meeting" }
    };

    const state = reducer({ ...initialState }, action);

    expect(state.show).toEqual(false);
  });

  it("tests <RetainStore> with OPEN_RETAIN action - with single retain", () => {
    const action = {
      type: "OPEN_RETAIN",
      payload: { logicKey: "meeting" }
    };

    const state = reducer(
      { ...initialState, stored: [{ logicKey: "meeting" }], show: true },
      action
    );

    expect(state.show).toEqual(false);
  });

  it("tests <RetainStore> with OPEN_RETAIN action - with two retain", () => {
    const action = {
      type: "OPEN_RETAIN",
      payload: { logicKey: "meeting" }
    };

    const state = reducer(
      {
        ...initialState,
        stored: [{ logicKey: "meeting" }, { logicKey: "user" }],
        show: true
      },
      action
    );

    expect(state.show).toEqual(true);
  });

  it("tests <RetainStore> with SAVE_RETAIN action", () => {
    const action = {
      type: "SAVE_RETAIN",
      payload: { logicKey: "meeting", logicId: "identity-123" }
    };

    const state = reducer({ ...initialState }, action);

    expect(state.show).toEqual(true);
  });

  it("tests <RetainStore> with SAVE_RETAIN action - with closed", () => {
    const action = {
      type: "SAVE_RETAIN",
      payload: { logicKey: "meeting", logicId: "identity-123" }
    };

    const state = reducer(
      {
        ...initialState,
        stored: [{ logicKey: "meeting" }, { logicKey: "user" }]
      },
      action
    );

    expect(state.show).toEqual(true);
  });

  it("tests <RetainStore> with wrong action", () => {
    const action = {
      type: "NONSENSE"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.stored.length).toEqual(1);
    expect(state.show).toEqual(false);
  });
});
