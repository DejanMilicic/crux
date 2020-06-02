import React from "react";
import { SwitchLabel } from "./SwitchLabel";
import { mount } from "enzyme";

describe("<SwitchLabel />", () => {
  const props = {
    id: "data-1",
    label: "A label",
    value: true,
    handleChange: jest.fn()
  };

  it("renders <SwitchLabel> with mount - render snapshot", () => {
    const wrapper = mount(<SwitchLabel {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("input")).toHaveLength(1);
  });

  it("renders <SwitchLabel> with mount - render required", () => {
    const wrapper = mount(<SwitchLabel {...props} required />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("input")).toHaveLength(1);
  });

  it("renders <SwitchLabel> with mount - simulate handleChange", () => {
    const wrapper = mount(<SwitchLabel {...props} required value={false} />);
    wrapper
      .find('input[type="checkbox"]')
      .simulate("change", { target: { checked: true } });
    expect(props.handleChange).toHaveBeenCalled();
  });
});
