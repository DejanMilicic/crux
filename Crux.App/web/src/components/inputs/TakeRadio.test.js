import React from "react";
import { TakeRadio } from "./TakeRadio";
import { mount } from "enzyme";

describe("<TakeRadio />", () => {
  const props = {
    value: 27,
    handleChange: jest.fn()
  };

  it("renders <TakeRadio> with mount - render snapshot", () => {
    const wrapper = mount(<TakeRadio {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("input")).toHaveLength(4);
  });

  it("renders <TakeRadio> with mount - simulate handleChange", () => {
    const wrapper = mount(<TakeRadio {...props} />);
    wrapper
      .find("input")
      .first()
      .simulate("change", { target: { value: "identity-123" } }, "testValue");
    expect(props.handleChange).toHaveBeenCalled();
  });
});
