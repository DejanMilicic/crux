import { postRef, resetRef } from "./actions";
import API from "../api";

jest.mock("../api");

describe("<RefStore /> actions", () => {
  it("tests postRef action - success", () => {
    const payload = { logicKey: "meeting", params: {} };
    const dispatch = jest.fn();

    API.post.mockResolvedValue({ data: payload });

    postRef(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests postRef action - no params", () => {
    const payload = { logicKey: "meeting" };
    const dispatch = jest.fn();

    API.post.mockResolvedValue({ data: payload });

    postRef(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests postRef action - failure", () => {
    const payload = { logicKey: "meeting" };
    const dispatch = jest.fn();

    API.post.mockRejectedValue(new Error("Test Error"));

    postRef(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests resetRef action", () => {
    const dispatch = jest.fn();
    resetRef(dispatch);
    expect(dispatch.mock.calls.length).toBe(1);
  });
});
