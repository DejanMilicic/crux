import React from "react";
import { NavLink } from "./NavLink";
import { mount } from "enzyme";

describe("<NavLink />", () => {
  const props = {
    to: "/edit/user/123"
  };

  it("renders <NavLink> with mount - render snapshot", () => {
    const wrapper = mount(<NavLink {...props}>test</NavLink>);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("button")).toHaveLength(0);
    expect(wrapper.find("a")).toHaveLength(1);
  });
});
