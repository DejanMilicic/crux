import { getModel, updateModel, postModel, resetModel } from "./actions";
import API from "../api";

jest.mock("../api");

describe("<ModelStore /> actions", () => {
  it("tests getModel action - success", () => {
    const payload = { logicId: "identity-123", logicKey: "meeting" };
    const dispatch = jest.fn();

    API.get.mockResolvedValue({ data: payload });

    getModel(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests getModel action - failure", () => {
    const payload = { logicId: "identity-123", logicKey: "meeting" };
    const dispatch = jest.fn();

    API.get.mockRejectedValue(new Error("Test Error"));

    getModel(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests updateModel action", () => {
    const payload = { logicKey: "meeting", model: {} };
    const dispatch = jest.fn();

    updateModel(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests postModel action - success", () => {
    const payload = {
      logicKey: "meeting",
      model: { id: "identity-123", name: "test" }
    };
    const dispatch = jest.fn();

    API.post.mockResolvedValue({ data: payload });

    postModel(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests postModel action - failure", () => {
    const payload = {
      logicKey: "meeting",
      model: { id: "identity-123", name: "test" }
    };
    const dispatch = jest.fn();

    API.post.mockRejectedValue(new Error("Test Error"));

    postModel(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests resetModel action", () => {
    const dispatch = jest.fn();

    resetModel(dispatch, "meeting");
    expect(dispatch.mock.calls.length).toBe(1);
  });
});
