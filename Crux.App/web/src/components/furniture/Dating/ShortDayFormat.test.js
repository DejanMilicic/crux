import React from "react";
import { ShortDayFormat } from "./ShortDayFormat";
import { mount } from "enzyme";

describe("<ShortDayFormat />", () => {
  it("renders <ShortDayFormat> with mount - render snapshot", () => {
    const wrapper = mount(<ShortDayFormat date="2004-8-16" />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(ShortDayFormat)).toHaveLength(1);
  });
});
