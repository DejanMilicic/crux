import React from "react";
import { Save } from "./Save";
import { mount } from "enzyme";

describe("<Save />", () => {
  const props = {
    disabled: false
  };

  it("renders <Save> with mount - render snapshot", () => {
    const wrapper = mount(<Save {...props}>Test</Save>);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("button")).toHaveLength(1);
  });
});
