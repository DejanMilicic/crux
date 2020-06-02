import React from "react";
import { ClickIcon } from "./ClickIcon";
import { mount } from "enzyme";
import IconButton from "@material-ui/core/IconButton";

describe("<ClickIcon />", () => {
  const props = {
    dispatch: jest.fn(),
    callback: jest.fn(),
    aria: "aria-label",
    color: "primary"
  };

  it("renders <ClickIcon> with mount - render snapshot", () => {
    const wrapper = mount(<ClickIcon {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("button")).toHaveLength(1);
  });

  it("renders <ClickIcon> with mount - simulate click", () => {
    const wrapper = mount(<ClickIcon {...props} />);
    wrapper.find(IconButton).simulate("click");
    expect(props.callback).toHaveBeenCalled();
  });
});
