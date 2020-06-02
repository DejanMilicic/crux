import React from "react";
import { ShortText } from "./ShortText";
import { mount } from "enzyme";

describe("<ShortText />", () => {
  const props = {
    id: "data-1",
    label: "A label",
    value: "27",
    handleChange: jest.fn()
  };

  it("renders <ShortText> with mount - render snapshot", () => {
    const wrapper = mount(<ShortText {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("input")).toHaveLength(1);
  });

  it("renders <ShortText> with mount - render required", () => {
    const wrapper = mount(<ShortText {...props} required />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("input")).toHaveLength(1);
  });

  it("renders <ShortText> with mount - simulate empty", () => {
    const wrapper = mount(
      <ShortText {...props} required requiredText="MissingText" />
    );
    wrapper
      .find("input")
      .first()
      .simulate("change", { target: { value: "" } });
    expect(props.handleChange).toHaveBeenCalled();
  });

  it("renders <ShortText> with mount - simulate with text", () => {
    const wrapper = mount(
      <ShortText {...props} required requiredText="MissingText" />
    );
    wrapper
      .find("input")
      .first()
      .simulate("change", { target: { value: "some text" } });
    expect(props.handleChange).toHaveBeenCalled();
  });
});
