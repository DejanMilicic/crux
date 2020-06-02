import { getDisplay, setDisplay, resetDisplay, toggleFav } from "./actions";
import API from "../api";

jest.mock("../api");

describe("<DisplayStore /> actions", () => {
  it("tests getDisplay action - success", () => {
    const payload = { id: "identity-123", logicKey: "meeting" };
    const dispatch = jest.fn();

    API.get.mockResolvedValue({ data: payload });

    getDisplay(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests getDisplay action - failure", () => {
    const payload = { id: "identity-123", logicKey: "meeting" };
    const dispatch = jest.fn();

    API.get.mockRejectedValue(new Error("Test Error"));

    getDisplay(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests setDisplay action", () => {
    const payload = { logicKey: "meeting", model: {} };
    const dispatch = jest.fn();

    setDisplay(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests resetDisplay action", () => {
    const dispatch = jest.fn();

    resetDisplay(dispatch);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests toggleFav action - success", () => {
    const payload = {
      logicId: "identity-123",
      logicKey: "meeting",
      favourite: true
    };
    const dispatch = jest.fn();

    API.get.mockResolvedValue({ data: payload });

    toggleFav(dispatch, payload);
  });

  it("tests toggleFav action - failure", () => {
    const payload = {
      logicId: "identity-123",
      logicKey: "meeting",
      favourite: false
    };
    const dispatch = jest.fn();

    API.get.mockRejectedValue(new Error("Test Error"));

    toggleFav(dispatch, payload);
  });
});
