import React from "react";
import { mount } from "enzyme";
import Radio from "@material-ui/core/Radio";
import { RadioList } from "./RadioList";

describe("<RadioList />", () => {
  const props = {
    id: "identity-123",
    logicKey: "logicKey",
    label: "label",
    handleChange: jest.fn(),
    list: [{ id: "identity-123", name: "name" }]
  };

  it("renders <RadioList> with mount - render snapshot", () => {
    const wrapper = mount(<RadioList {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Radio)).toHaveLength(1);
  });

  it("renders <RadioList> with mount - render required", () => {
    const wrapper = mount(<RadioList {...props} required />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Radio)).toHaveLength(1);
  });

  it("renders <RadioList> with mount - render selected", () => {
    const wrapper = mount(
      <RadioList {...props} value={{ id: "identity-123", name: "name" }} />
    );
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Radio)).toHaveLength(1);
  });

  it("renders <RadioList> with mount - simulate handleChange", () => {
    const wrapper = mount(<RadioList {...props} required />);
    wrapper
      .find("input")
      .simulate("change", { target: { value: "identity-123" } }, "testValue");
    expect(props.handleChange).toHaveBeenCalled();
  });
});
