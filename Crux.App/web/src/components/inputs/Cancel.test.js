import React from "react";
import { Cancel } from "./Cancel";
import { mount } from "enzyme";
import Button from "@material-ui/core/Button";

describe("<Cancel />", () => {
  const props = {
    dispatch: jest.fn(),
    callback: jest.fn()
  };

  it("renders <Cancel> with mount - dialog snapshot", () => {
    const wrapper = mount(<Cancel {...props} isDialog={true} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it("renders <Cancel> with mount - canvas snapshot", () => {
    const wrapper = mount(<Cancel {...props} isDialog={false} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it("renders <Cancel> with mount - simulate canvas", () => {
    const wrapper = mount(<Cancel {...props} isDialog={false} />);
    wrapper.find(Button).simulate("click");
    expect(props.callback).not.toHaveBeenCalled();
  });

  it("renders <Cancel> with mount - simulate dialog", () => {
    const wrapper = mount(<Cancel {...props} isDialog={true} />);
    wrapper.find(Button).simulate("click");
    expect(props.callback).toHaveBeenCalled();
  });
});
