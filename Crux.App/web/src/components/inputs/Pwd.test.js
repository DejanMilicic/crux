import React from "react";
import { Pwd } from "./Pwd";
import { mount } from "enzyme";

describe("<Pwd />", () => {
  const props = {
    id: "data-1",
    label: "A label",
    value: "xyzzz",
    handleChange: jest.fn()
  };

  it("renders <Pwd> with mount - render snapshot", () => {
    const wrapper = mount(<Pwd {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("input")).toHaveLength(1);
  });

  it("renders <Pwd> with mount - render required", () => {
    const wrapper = mount(<Pwd {...props} required />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("input")).toHaveLength(1);
  });

  it("renders <Pwd> with mount - simulate empty", () => {
    const wrapper = mount(<Pwd {...props} required />);
    wrapper.find("input").simulate("change", { target: { value: "" } });
    expect(props.handleChange).toHaveBeenCalled();
  });

  it("renders <Pwd> with mount - simulate with text", () => {
    const wrapper = mount(<Pwd {...props} required />);
    wrapper
      .find("input")
      .simulate("change", { target: { value: "myPassword" } });
    expect(props.handleChange).toHaveBeenCalled();
  });
});
