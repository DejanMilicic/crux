import { openRetain, saveRetain } from "./actions";

describe("<RetainStore /> actions", () => {
  it("tests openRetain action", () => {
    const payload = "identity-123";
    const dispatch = jest.fn();

    openRetain(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it("tests saveRetain action", () => {
    const payload = "identity-123";
    const dispatch = jest.fn();

    saveRetain(dispatch, payload);
    expect(dispatch.mock.calls.length).toBe(1);
  });
});
