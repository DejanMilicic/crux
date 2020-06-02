import {
  openBurger,
  closeBurger,
  openQuery,
  closeQuery,
  openSettings,
  closeSettings
} from "./actions";

describe("<LoaderStore /> actions", () => {
  it("tests openBurger action", () => {
    const dispatch = jest.fn();
    openBurger(dispatch);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests closeBurger action", () => {
    const dispatch = jest.fn();
    closeBurger(dispatch);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests openQuery action", () => {
    const dispatch = jest.fn();
    openQuery(dispatch);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests closeQuery action", () => {
    const dispatch = jest.fn();
    closeQuery(dispatch);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests openSettings action", () => {
    const dispatch = jest.fn();
    openSettings(dispatch);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests closeSettings action", () => {
    const dispatch = jest.fn();
    closeSettings(dispatch);
    expect(dispatch.mock.calls.length).toBe(1);
  });
});
