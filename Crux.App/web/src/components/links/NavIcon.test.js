import React from "react";
import { NavIcon } from "./NavIcon";
import { mount } from "enzyme";

describe("<NavIcon />", () => {
  const props = {
    color: "inherit",
    to: "/edit/user/123"
  };

  it("renders <NavIcon> with mount - render snapshot", () => {
    const wrapper = mount(<NavIcon {...props}>test</NavIcon>);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("button")).toHaveLength(1);
  });
});
