import React from "react";
import { LongText } from "./LongText";
import { mount } from "enzyme";

describe("<LongText />", () => {
  const props = {
    id: "data-1",
    label: "A label",
    value: "some long text",
    handleChange: jest.fn(),
    rows: 4
  };

  it("renders <LongText> with mount - render snapshot", () => {
    const wrapper = mount(<LongText {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("textarea")).toHaveLength(2);
  });

  it("renders <LongText> with mount - render required", () => {
    const wrapper = mount(
      <LongText {...props} required requiredText="MissingText" />
    );
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("textarea")).toHaveLength(2);
  });

  it("renders <LongText> with mount - simulate empty", () => {
    const wrapper = mount(
      <LongText {...props} required requiredText="MissingText" />
    );
    wrapper
      .find("textarea")
      .first()
      .simulate("change", { target: { value: "" } });
    expect(props.handleChange).toHaveBeenCalled();
  });

  it("renders <LongText> with mount - simulate with text", () => {
    const wrapper = mount(
      <LongText {...props} required requiredText="MissingText" />
    );
    wrapper
      .find("textarea")
      .first()
      .simulate("change", { target: { value: "some text" } });
    expect(props.handleChange).toHaveBeenCalled();
  });
});
