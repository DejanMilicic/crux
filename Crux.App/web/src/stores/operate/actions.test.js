import { getOperate, postOperate, setOperate } from "./actions";
import API from "../api";

jest.mock("../api");

describe("<OperateStore /> actions", () => {
  it("tests getOperate action - success", () => {
    const payload = {
      logicId: "identity-123",
      logicKey: "meeting",
      operation: "activate"
    };
    const dispatch = jest.fn();

    API.get.mockResolvedValue({ data: payload });

    getOperate(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests getOperate action - failure", () => {
    const payload = {
      logicId: "identity-123",
      logicKey: "meeting",
      operation: "activate"
    };
    const dispatch = jest.fn();

    API.get.mockRejectedValue(new Error("Test Error"));

    getOperate(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests postOperate action - success", () => {
    const payload = {
      logicId: "identity-123",
      logicKey: "meeting",
      operation: "activate",
      model: { id: "identity-123", name: "test" }
    };
    const dispatch = jest.fn();

    API.post.mockResolvedValue({ data: payload });

    postOperate(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests postOperate action - failure", () => {
    const payload = {
      logicId: "identity-123",
      logicKey: "meeting",
      operation: "activate",
      model: { id: "identity-123", name: "test" }
    };
    const dispatch = jest.fn();

    API.post.mockRejectedValue(new Error("Test Error"));

    postOperate(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests setOperate action - success", () => {
    const payload = {
      logicId: "identity-123",
      logicKey: "meeting",
      operation: "activate",
      set: "extender"
    };
    const dispatch = jest.fn();

    API.get.mockResolvedValue({ data: payload });

    setOperate(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests setOperate action - failure", () => {
    const payload = {
      logicId: "identity-123",
      logicKey: "meeting",
      operation: "activate",
      set: "extender"
    };
    const dispatch = jest.fn();

    API.get.mockRejectedValue(new Error("Test Error"));

    setOperate(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });
});
