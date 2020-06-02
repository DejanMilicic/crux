import React from "react";
import MsgMenu from "./MsgMenu";
import { mount } from "enzyme";

describe("<MsgMenu />", () => {
  const props = { logicKey: "msg", model: { id: "identity-123-A" } };

  it("renders <MsgMenu> with mount - render snapshot", () => {
    const wrapper = mount(<MsgMenu {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MsgMenu)).toHaveLength(1);
  });
});
