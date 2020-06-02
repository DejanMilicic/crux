import { logicKey } from "./userConst";

describe("userConst logicKey", () => {
  it("matches USER logicKey", () => {
    expect(logicKey).toEqual("user");
  });
});
