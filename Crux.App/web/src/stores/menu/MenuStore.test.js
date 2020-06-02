import { reducer, initialState } from "./MenuStore";

describe("<MenuStore />", () => {
  it("tests <MenuStore> with OPEN_BURGER action", () => {
    const action = {
      type: "OPEN_BURGER",
      payload: { open: true }
    };

    const state = reducer({ ...initialState }, action);

    expect(state.burger.isOpen).toEqual(true);
    expect(state.query.isOpen).toEqual(false);
    expect(state.settings.isOpen).toEqual(false);
  });

  it("tests <MenuStore> with CLOSE_BURGER action", () => {
    const action = {
      type: "CLOSE_BURGER",
      payload: { open: false }
    };

    const state = reducer({ ...initialState }, action);

    expect(state.burger.isOpen).toEqual(false);
    expect(state.query.isOpen).toEqual(false);
    expect(state.settings.isOpen).toEqual(false);
  });

  it("tests <MenuStore> with OPEN_QUERY action", () => {
    const action = {
      type: "OPEN_QUERY",
      payload: { open: true }
    };

    const state = reducer({ ...initialState }, action);

    expect(state.burger.isOpen).toEqual(false);
    expect(state.query.isOpen).toEqual(true);
    expect(state.settings.isOpen).toEqual(false);
  });

  it("tests <MenuStore> with CLOSE_QUERY action", () => {
    const action = {
      type: "CLOSE_QUERY",
      payload: { open: false }
    };

    const state = reducer({ ...initialState }, action);

    expect(state.burger.isOpen).toEqual(false);
    expect(state.query.isOpen).toEqual(false);
    expect(state.settings.isOpen).toEqual(false);
  });

  it("tests <MenuStore> with OPEN_SETTINGS action", () => {
    const action = {
      type: "OPEN_SETTINGS",
      payload: { open: true }
    };

    const state = reducer({ ...initialState }, action);

    expect(state.burger.isOpen).toEqual(false);
    expect(state.query.isOpen).toEqual(false);
    expect(state.settings.isOpen).toEqual(true);
  });

  it("tests <MenuStore> with CLOSE_SETTINGS action", () => {
    const action = {
      type: "CLOSE_SETTINGS",
      payload: { open: false }
    };

    const state = reducer({ ...initialState }, action);

    expect(state.burger.isOpen).toEqual(false);
    expect(state.query.isOpen).toEqual(false);
    expect(state.settings.isOpen).toEqual(false);
  });

  it("tests <MenuStore> with wrong action", () => {
    const action = {
      type: "NONSENSE"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.burger.isOpen).toEqual(false);
    expect(state.query.isOpen).toEqual(false);
    expect(state.settings.isOpen).toEqual(false);
  });
});
