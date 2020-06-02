import { logicKey } from "./meetingConst";

describe("meetingConst logicKey", () => {
  it("matches MEETING logicKey", () => {
    expect(logicKey).toEqual("meeting");
  });
});
