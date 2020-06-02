import React from "react";
import { act } from "react-dom/test-utils";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import Menu from "@material-ui/core/Menu";
import { MenuIcon } from "./MenuIcon";
import { mount } from "enzyme";

describe("<MenuIcon />", () => {
  const props = {
    id: "identity-123"
  };

  it("renders <DloadIcon> with mount - render snapshot", () => {
    const wrapper = mount(<MenuIcon {...props}>Test</MenuIcon>);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Icon)).toHaveLength(1);
  });

  it("renders <DloadIcon> with mount - simulate click", () => {
    const wrapper = mount(<MenuIcon {...props}>Test</MenuIcon>);
    wrapper.find(IconButton).simulate("click");
    expect(wrapper.find(Popover)).toHaveLength(1);
  });

  it("renders <DloadIcon> with mount - simulate close", () => {
    const wrapper = mount(<MenuIcon {...props}>Test</MenuIcon>);
    wrapper.find(IconButton).simulate("click");

    act(() => {
      wrapper
        .find(Menu)
        .props()
        .onClose();
    });
  });
});
