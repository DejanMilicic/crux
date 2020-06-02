import React from "react";
import { BackIcon } from "./BackIcon";
import { mount } from "enzyme";
import IconButton from "@material-ui/core/IconButton";

describe("<BackIcon />", () => {
  it("renders <BackIcon> with mount - render snapshot", () => {
    const wrapper = mount(<BackIcon />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("button")).toHaveLength(1);
  });

  it("renders <BackIcon> with mount - simulate close", () => {
    const wrapper = mount(<BackIcon />);
    wrapper.find(IconButton).simulate("click");
  });
});
