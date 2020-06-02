import { getConfig, setConfig, postLogin, postReconnect, setLogout, setForget, endForget, postForgot, postReply, postReset, postTwoFactor, postSignup, postEntry } from "./actions";
import API from "../api";

jest.mock("../api");

describe("<UserStore /> actions", () => {
  it("tests getConfig action - success", () => {
    const dispatch = jest.fn();

    API.get.mockResolvedValue({ data: true });

    getConfig(dispatch);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests getConfig action - failure", () => {
    const dispatch = jest.fn();

    API.get.mockRejectedValue(new Error("Test Error"));

    getConfig(dispatch);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests setConfig action", () => {
    const payload = { key: "notify", value: "true" };
    const dispatch = jest.fn();

    API.get.mockResolvedValue({ data: payload });

    setConfig(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests setConfig action - failure", () => {
    const payload = { key: "notify", value: "true" };
    const dispatch = jest.fn();

    API.get.mockRejectedValue(new Error("Test Error"));

    setConfig(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests postLogin action - success", () => {
    const payload = { login: "joe", pwd: "plenty", rememberMe: true };
    const dispatch = jest.fn();

    API.post.mockResolvedValue({ data: payload });

    postLogin(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests postLogin action - failure", () => {
    const payload = { login: "joe", pwd: "plenty", rememberMe: true };
    const dispatch = jest.fn();

    API.post.mockRejectedValue(new Error("Test Error"));

    postLogin(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests postReconnect action - success", () => {
    const payload = { key: "xyz", verification: "123" };
    const dispatch = jest.fn();

    API.post.mockResolvedValue({ data: payload });

    postReconnect(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests postReconnect action - failure", () => {
    const payload = { key: "xyz", verification: "123" };
    const dispatch = jest.fn();

    API.post.mockRejectedValue(new Error("Test Error"));

    postReconnect(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests setLogout action", () => {
    const dispatch = jest.fn();
    setLogout(dispatch);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests setForget action", () => {
    const dispatch = jest.fn();
    setForget(dispatch);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests endForget action", () => {
    const dispatch = jest.fn();
    endForget(dispatch);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests endForget action - cancel", () => {
    const dispatch = jest.fn();

    API.post.mockResolvedValue({ data: {} });

    endForget(dispatch, { email: "test@test.com" });
    expect(dispatch.mock.calls.length).toBe(0);
  });

  it("tests postForgot action - success", () => {
    const payload = { email: "test@test.com", code: "xyz" };
    const dispatch = jest.fn();

    API.post.mockResolvedValue({ data: payload });

    postForgot(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests postForgot action - failure", () => {
    const payload = { email: "test@test.com", code: "xyz" };
    const dispatch = jest.fn();

    API.post.mockRejectedValue(new Error("Test Error"));

    postForgot(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests postReply action - success", () => {
    const payload = { auth: "123", code: "xyz" };
    const dispatch = jest.fn();

    API.post.mockResolvedValue({ data: payload });

    postReply(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests postReply action - failure", () => {
    const payload = { auth: "123", code: "xyz" };
    const dispatch = jest.fn();

    API.post.mockRejectedValue(new Error("Test Error"));

    postReply(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests postReset action - success", () => {
    const payload = { email: "test@test.com", code: "xyz", pwd: "pwd", resetCode: "123" };
    const dispatch = jest.fn();

    API.post.mockResolvedValue({ data: payload });

    postReset(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests postReset action - failure", () => {
    const payload = { email: "test@test.com", code: "xyz", pwd: "pwd", resetCode: "123" };
    const dispatch = jest.fn();

    API.post.mockRejectedValue(new Error("Test Error"));

    postReset(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests postTwoFactor action - success", () => {
    const payload = { code: "xyz", id: "users-12-A" };
    const dispatch = jest.fn();

    API.post.mockResolvedValue({ data: payload });

    postTwoFactor(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests postTwoFactor action - failure", () => {
    const payload = { code: "xyz", id: "users-12-A" };
    const dispatch = jest.fn();

    API.post.mockRejectedValue(new Error("Test Error"));

    postTwoFactor(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests postSignup action - success", () => {
    const payload = { name: "test", email: "test@test.com", pwd: "pwd", tenantName: "org" };
    const dispatch = jest.fn();

    API.post.mockResolvedValue({ data: payload });

    postSignup(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests postSignup action - failure", () => {
    const payload = { name: "test", email: "test@test.com", pwd: "pwd", tenantName: "org" };
    const dispatch = jest.fn();

    API.post.mockRejectedValue(new Error("Test Error"));

    postSignup(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests postEntry action - success", () => {
    const payload = { entryKey: "xyx", tenantId: "tenants-123-A", tenantName: "org" };
    const dispatch = jest.fn();

    API.post.mockResolvedValue({ data: payload });

    postEntry(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests postEntry action - failure", () => {
    const payload = { entryKey: "xyx", tenantId: "tenants-123-A", tenantName: "org" };
    const dispatch = jest.fn();

    API.post.mockRejectedValue(new Error("Test Error"));

    postEntry(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });
});
