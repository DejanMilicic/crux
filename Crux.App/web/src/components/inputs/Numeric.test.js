import React from "react";
import { Numeric } from "./Numeric";
import { mount } from "enzyme";

describe("<Numeric />", () => {
  const props = {
    id: "data-1",
    label: "A label",
    value: 27,
    handleChange: jest.fn()
  };

  it("renders <Numeric> with mount - render snapshot", () => {
    const wrapper = mount(<Numeric {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("input")).toHaveLength(1);
  });

  it("renders <Numeric> with mount - render required", () => {
    const wrapper = mount(<Numeric {...props} required />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("input")).toHaveLength(1);
  });

  it("renders <Numeric> with mount - simulate handleChange", () => {
    const wrapper = mount(<Numeric {...props} required />);
    wrapper.find("input").simulate("change", { target: { value: "1234" } });
    expect(props.handleChange).toHaveBeenCalled();
  });
});
