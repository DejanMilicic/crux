import {
  postFile,
  queueFiles,
  loadAll,
  loadSingle,
  resetLoader,
  getGif
} from "./actions";
import API from "../api";

jest.mock("../api");

describe("<LoaderStore /> actions", () => {
  const file = {
    name: "test.png",
    size: 5678,
    type: "image/png"
  };

  it("tests postFile action - success", () => {
    const payload = file;
    const dispatch = jest.fn();

    API.post.mockResolvedValue({ data: payload });

    postFile(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests postFile action - failure", () => {
    const payload = null;
    const dispatch = jest.fn();

    API.post.mockRejectedValue(new Error("Test Error"));

    postFile(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests queueFiles action", () => {
    const params = [file];
    const dispatch = jest.fn();

    queueFiles(dispatch, params);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests resetLoader action", () => {
    const dispatch = jest.fn();

    resetLoader(dispatch);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests loadSingle action - success", () => {
    const payload = file;
    const dispatch = jest.fn();

    API.post.mockResolvedValue({ data: payload });

    loadSingle(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests loadSingle action - failure", () => {
    const payload = file;
    const dispatch = jest.fn();

    API.post.mockRejectedValue(new Error("Test Error"));

    loadSingle(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests loadAll action - success", () => {
    const payload = [file];
    const dispatch = jest.fn();

    API.post.mockResolvedValue({ data: payload });

    loadAll(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests loadAll action - failure", () => {
    const payload = [file];
    const dispatch = jest.fn();

    API.post.mockRejectedValue(new Error("Test Error"));

    loadAll(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests getGif action - success", () => {
    const payload = { tags: ["test"] };
    const dispatch = jest.fn();

    API.get.mockResolvedValue({ data: payload });

    getGif(dispatch, payload);
  });

  it("tests getGif action - failure", () => {
    const payload = { tags: ["test"] };
    const dispatch = jest.fn();

    API.get.mockRejectedValue(new Error("Test Error"));

    getGif(dispatch, payload);
  });
});
