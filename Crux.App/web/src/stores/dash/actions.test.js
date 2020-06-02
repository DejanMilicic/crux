import { getDash } from "./actions";
import API from "../api";

jest.mock("../api");

describe("<DashStore /> actions", () => {
  it("tests getDash action - success", () => {
    const payload = {
      id: "identity-123",
      logicKey: "meeting",
      operation: "home"
    };
    const dispatch = jest.fn();

    API.get.mockResolvedValue({ data: payload });

    getDash(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests getDash action - success no id", () => {
    const payload = {
      logicKey: "meeting",
      operation: "dash"
    };
    const dispatch = jest.fn();

    API.get.mockResolvedValue({ data: payload });

    getDash(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests getDash action - failure", () => {
    const payload = {
      id: "identity-123",
      logicKey: "meeting",
      operation: "home"
    };
    const dispatch = jest.fn();

    API.get.mockRejectedValue(new Error("Test Error"));

    getDash(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });
});
