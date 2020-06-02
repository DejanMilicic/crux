import React from "react";
import { CloseIcon } from "./CloseIcon";
import { mount } from "enzyme";
import IconButton from "@material-ui/core/IconButton";

describe("<CloseIcon />", () => {
  const props = {
    dispatch: jest.fn(),
    callback: jest.fn()
  };

  it("renders <CloseIcon> with mount - render snapshot", () => {
    const wrapper = mount(<CloseIcon {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("button")).toHaveLength(1);
  });

  it("renders <CloseIcon> with mount - simulate click", () => {
    const wrapper = mount(<CloseIcon {...props} />);
    wrapper.find(IconButton).simulate("click");
    expect(props.callback).toHaveBeenCalled();
  });
});
