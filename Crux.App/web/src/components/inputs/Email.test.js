import React from "react";
import { Email } from "./Email";
import { mount } from "enzyme";
import { validate } from "@babel/types";

describe("<Email />", () => {
  const props = {
    id: "data-1",
    label: "A label",
    value: "dave@dave.com",
    handleChange: jest.fn()
  };

  it("renders <Email> with mount - render snapshot", () => {
    const wrapper = mount(<Email {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("input")).toHaveLength(1);
  });

  it("renders <Email> with mount - render with required", () => {
    const wrapper = mount(<Email {...props} required />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("input")).toHaveLength(1);
  });

  it("renders <Email> with mount - render with valid", () => {
    const wrapper = mount(<Email {...props} required />);
    wrapper
      .find("input")
      .simulate("change", { target: { value: "valid@ok.com" } });
    expect(props.handleChange).toHaveBeenCalled();
  });

  it("renders <Email> with mount - render with missing text", () => {
    const wrapper = mount(<Email {...props} required />);
    wrapper.find("input").simulate("change", { target: { value: "" } });
    expect(props.handleChange).toHaveBeenCalled();
  });

  it("renders <Email> with mount - render with wrong input", () => {
    const wrapper = mount(<Email {...props} required />);
    wrapper.find("input").simulate("change", { target: { value: "rubbish" } });
    expect(props.handleChange).toHaveBeenCalled();
  });
});
