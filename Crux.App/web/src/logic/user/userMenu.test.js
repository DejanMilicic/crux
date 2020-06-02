import React from "react";
import UserMenu from "./userMenu";
import { mount } from "enzyme";

describe("<UserMenu />", () => {
  const props = { logicKey: "msg", model: { id: "identity-123-A" } };

  it("renders <UserMenu> with mount - render snapshot", () => {
    const wrapper = mount(<UserMenu {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(UserMenu)).toHaveLength(1);
  });
});
