import { getNotes, postNote, deleteNote } from "./actions";
import API from "../api";

jest.mock("../api");

describe("<NoteStore /> actions", () => {
  it("tests getNotes action - success", () => {
    const payload = { logicId: "identity-123", logicKey: "meeting" };
    const dispatch = jest.fn();

    API.get.mockResolvedValue({ data: payload });

    getNotes(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests getNotes action - failure", () => {
    const payload = { logicId: "identity-123", logicKey: "meeting" };
    const dispatch = jest.fn();

    API.get.mockRejectedValue(new Error("Test Error"));

    getNotes(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests postNote action - success", () => {
    const payload = {
      logicKey: "meeting",
      model: { id: "identity-123", name: "test" }
    };
    const dispatch = jest.fn();

    API.post.mockResolvedValue({ data: payload });

    postNote(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests postNote action - failure", () => {
    const payload = {
      logicKey: "meeting",
      model: { id: "identity-123", name: "test" }
    };
    const dispatch = jest.fn();

    API.post.mockRejectedValue(new Error("Test Error"));

    postNote(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests deleteNote action - success", () => {
    const payload = {
      logicKey: "meeting",
      logicId: "identity-123",
      counter: 0
    };
    const dispatch = jest.fn();

    API.get.mockResolvedValue({ data: payload });

    deleteNote(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests deleteNote action - failure", () => {
    const payload = {
      logicKey: "meeting",
      logicId: "identity-123",
      counter: 0
    };
    const dispatch = jest.fn();

    API.get.mockRejectedValue(new Error("Test Error"));

    deleteNote(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });
});
