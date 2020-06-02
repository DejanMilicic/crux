import { logicKey } from "./tenantConst";

describe("tenantConst logicKey", () => {
  it("matches TENANT logicKey", () => {
    expect(logicKey).toEqual("tenant");
  });
});
