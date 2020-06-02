import { getDelete, resetDelete } from "./actions";
import API from "../api";

jest.mock("../api");

describe("<DeleteStore /> actions", () => {
  it("tests getDelete action - success", () => {
    const payload = { id: "identity-123", logicKey: "meeting" };
    const dispatch = jest.fn();

    API.get.mockResolvedValue({ data: payload });

    getDelete(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests getDelete action - failure", () => {
    const payload = { id: "identity-123", logicKey: "meeting" };
    const dispatch = jest.fn();

    API.get.mockRejectedValue(new Error("Test Error"));

    getDelete(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests resetDelete action", () => {
    const dispatch = jest.fn();

    resetDelete(dispatch);
    expect(dispatch.mock.calls.length).toBe(1);
  });
});
