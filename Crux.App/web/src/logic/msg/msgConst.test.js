import { logicKey } from "./msgConst";

describe("msgConst logicKey", () => {
  it("matches MSG logicKey", () => {
    expect(logicKey).toEqual("msg");
  });
});
