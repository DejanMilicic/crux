import React from "react";
import { ShortTimeFormat } from "./ShortTimeFormat";
import { mount } from "enzyme";

describe("<ShortDayFormat />", () => {
  it("renders <ShortTimeFormat> with mount - render snapshot", () => {
    const wrapper = mount(<ShortTimeFormat date="2015-7-12" />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(ShortTimeFormat)).toHaveLength(1);
    expect(wrapper.find("p")).toHaveLength(1);
  });
});
