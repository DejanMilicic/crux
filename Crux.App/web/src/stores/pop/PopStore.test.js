import React, { Fragment } from "react";
import { reducer, initialState } from "./PopStore";

describe("<PopStore />", () => {
  it("tests <PopStore> with OPEN_DIALOG action", () => {
    const action = {
      type: "OPEN_DIALOG",
      payload: <Fragment />
    };

    const state = reducer({ ...initialState }, action);

    expect(state.index).toEqual(1);
    expect(state.show).toEqual(true);
    expect(state.stored.length).toEqual(1);
  });

  it("tests <PopStore> with CLOSE_DIALOG action", () => {
    const action = {
      type: "CLOSE_DIALOG"
    };

    const state = reducer(
      {
        ...initialState,
        index: 1,
        stored: [<Fragment />],
        current: <Fragment />,
        show: true
      },
      action
    );

    expect(state.index).toEqual(0);
    expect(state.show).toEqual(false);
    expect(state.stored.length).toEqual(0);
  });

  it("tests <PopStore> with CLOSE_DIALOG action - 2 popups", () => {
    const action = {
      type: "CLOSE_DIALOG"
    };

    const state = reducer(
      {
        ...initialState,
        index: 2,
        stored: [<Fragment />, <Fragment />],
        current: <Fragment />,
        show: true
      },
      action
    );

    expect(state.index).toEqual(1);
    expect(state.show).toEqual(true);
    expect(state.stored.length).toEqual(1);
  });

  it("tests <PopStore> with REPLACE_DIALOG action", () => {
    const action = {
      type: "REPLACE_DIALOG",
      payload: <Fragment />
    };

    const state = reducer(
      {
        ...initialState,
        index: 1,
        stored: [<Fragment />],
        current: <Fragment />,
        show: true
      },
      action
    );

    expect(state.index).toEqual(1);
    expect(state.show).toEqual(true);
    expect(state.stored.length).toEqual(1);
  });

  it("tests <PopStore> with wrong action", () => {
    const action = {
      type: "NONSENSE"
    };

    const state = reducer({ ...initialState }, action);

    expect(state.index).toEqual(0);
    expect(state.show).toEqual(false);
  });
});
