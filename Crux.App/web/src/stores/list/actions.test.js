import { postFilter, updateParams, resetFilter, toggleFav } from "./actions";
import API from "../api";

jest.mock("../api");

describe("<ListStore /> actions", () => {
  it("tests postFilter action - success", () => {
    const payload = { logicKey: "meeting", params: { search: "", take: 10 } };
    const dispatch = jest.fn();

    API.post.mockResolvedValue({ data: payload });

    postFilter(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests postFilter action - failure", () => {
    const payload = { logicKey: "meeting", params: { search: "", take: 10 } };
    const dispatch = jest.fn();

    API.post.mockRejectedValue(new Error("Test Error"));

    postFilter(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests updateParams action", () => {
    const params = { search: "", take: 10 };
    const dispatch = jest.fn();

    updateParams(dispatch, params);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests resetFilter action", () => {
    const params = { search: "", take: 10 };
    const dispatch = jest.fn();

    resetFilter(dispatch, params);
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
