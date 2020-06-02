import React, { Fragment } from "react";
import { openDialog, closeDialog, replaceDialog } from "./actions";

describe("<PopStore /> actions", () => {
  it("tests openDialog action", () => {
    const payload = { component: <Fragment /> };
    const dispatch = jest.fn();

    openDialog(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests closeDialog action", () => {
    const dispatch = jest.fn();

    closeDialog(dispatch);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests replaceDialog action", () => {
    const payload = { component: <Fragment /> };
    const dispatch = jest.fn();

    replaceDialog(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });
});
