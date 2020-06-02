import React from "react";
import { CheckLabel } from "./CheckLabel";
import { mount } from "enzyme";

describe("<CheckLabel />", () => {
  const props = {
    id: "data-1",
    label: "A label",
    handleChange: jest.fn()
  };

  it("renders <CheckLabel> with mount - Check On snapshot", () => {
    const wrapper = mount(<CheckLabel {...props} value={true} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("input")).toHaveLength(1);
  });

  it("renders <CheckLabel> with mount - Check Off snapshot", () => {
    const wrapper = mount(<CheckLabel {...props} value={false} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("input")).toHaveLength(1);
  });

  it("renders <CheckLabel> with mount - simulate change", () => {
    const wrapper = mount(<CheckLabel {...props} value={false} />);

    wrapper
      .find('input[type="checkbox"]')
      .simulate("change", { target: { checked: true } });

    expect(props.handleChange).toHaveBeenCalled();
  });
});
