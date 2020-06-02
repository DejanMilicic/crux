import React from "react";
import { NavDraw } from "./NavDraw";
import { mount } from "enzyme";

describe("<NavDraw />", () => {
  const props = {
    label: "A Label",
    key: "user",
    to: "/edit/user/123"
  };

  it("renders <NavDraw> with mount - render snapshot", () => {
    const wrapper = mount(<NavDraw {...props}>test</NavDraw>);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("button")).toHaveLength(0);
    expect(wrapper.find("a")).toHaveLength(1);
  });
});
