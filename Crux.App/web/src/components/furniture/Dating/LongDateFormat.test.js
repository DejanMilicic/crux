import React from "react";
import { LongDateFormat } from "./LongDateFormat";
import { mount } from "enzyme";

describe("<LongDateFormat />", () => {
  it("renders <LongDateFormat> with mount - render snapshot", () => {
    const wrapper = mount(<LongDateFormat date="2014-2-27" />);

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(LongDateFormat)).toHaveLength(1);
    expect(wrapper.find("p")).toHaveLength(1);
  });
});
