import React from "react";
import { NavButton } from "./NavButton";
import { mount } from "enzyme";

describe("<NavButton />", () => {
  const props = {
    to: "/edit/user/123"
  };

  it("renders <NavButton> with mount - render snapshot", () => {
    const wrapper = mount(<NavButton {...props}>test</NavButton>);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("button")).toHaveLength(0);
    expect(wrapper.find("a")).toHaveLength(1);
  });
});
