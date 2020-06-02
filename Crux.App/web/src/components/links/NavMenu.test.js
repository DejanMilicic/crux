import React from "react";
import { NavMenu } from "./NavMenu";
import { mount } from "enzyme";

describe("<NavMenu />", () => {
  const props = {
    to: "/edit/user/123"
  };

  it("renders <NavMenu> with mount - render snapshot", () => {
    const wrapper = mount(<NavMenu {...props}>test</NavMenu>);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("button")).toHaveLength(0);
    expect(wrapper.find("a")).toHaveLength(1);
  });
});
