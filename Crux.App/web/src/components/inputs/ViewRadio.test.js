import React from "react";
import { ViewRadio } from "./ViewRadio";
import { mount } from "enzyme";

describe("<ViewRadio />", () => {
  const props = {
    value: "a key",
    handleChange: jest.fn()
  };

  it("renders <ViewRadio> with mount - render snapshot", () => {
    const wrapper = mount(<ViewRadio {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("input")).toHaveLength(2);
  });

  it("renders <ViewRadio> with mount - simulate handleChange", () => {
    const wrapper = mount(<ViewRadio {...props} />);
    wrapper
      .find("input")
      .first()
      .simulate("change", { target: { value: "identity-123" } }, "testValue");
    expect(props.handleChange).toHaveBeenCalled();
  });
});
