import React from "react";
import { Submit } from "./Submit";
import { mount } from "enzyme";

describe("<Submit />", () => {
  const props = {
    disabled: false
  };

  it("renders <Submit> with mount - render snapshot", () => {
    const wrapper = mount(<Submit {...props}>Test</Submit>);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("button")).toHaveLength(1);
  });
});
