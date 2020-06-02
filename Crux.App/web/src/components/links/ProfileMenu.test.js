import React from "react";
import { ProfileMenu } from "./ProfileMenu";
import { mount } from "enzyme";
import ListItem from "@material-ui/core/ListItem";

describe("<ProfileMenu />", () => {
  const props = {
    handleChange: jest.fn(),
    closeSelect: false,
    dispatch: jest.fn(),
    callback: jest.fn(),
    value: { name: "", profileThumbUrl: "" }
  };

  it("renders <ProfileMenu> with mount - render canvas", () => {
    const wrapper = mount(<ProfileMenu {...props}>test</ProfileMenu>);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("img")).toHaveLength(0);
  });

  it("renders <ProfileMenu> with mount - render dialog", () => {
    const value = {
      name: "testimage",
      profileThumbUrl: "https://somewhere.com"
    };

    const wrapper = mount(
      <ProfileMenu {...props} isDialog selected value={value}>
        test
      </ProfileMenu>
    );
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("img")).toHaveLength(1);
  });

  it("renders <ProfileMenu> with mount - simulate click canvas", () => {
    const wrapper = mount(<ProfileMenu {...props}>test</ProfileMenu>);
    wrapper.find(ListItem).simulate("click");
    expect(props.handleChange).toHaveBeenCalled();
    expect(props.callback).not.toHaveBeenCalled();
  });

  it("renders <ProfileMenu> with mount - simulate close", () => {
    const wrapper = mount(
      <ProfileMenu {...props} isDialog closeSelect>
        test
      </ProfileMenu>
    );
    wrapper.find(ListItem).simulate("click");
    expect(props.handleChange).toHaveBeenCalled();
    expect(props.callback).toHaveBeenCalled();
  });
});
