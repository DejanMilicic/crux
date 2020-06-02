import React from "react";
import { ShortDateFormat } from "./ShortDateFormat";
import { mount } from "enzyme";

describe("<ShortDateFormat />", () => {
  it("renders <ShortDateFormat> with mount - render snapshot", () => {
    const wrapper = mount(<ShortDateFormat date="2015-04-15" />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(ShortDateFormat)).toHaveLength(1);
    expect(wrapper.find("p")).toHaveLength(1);
  });
});
