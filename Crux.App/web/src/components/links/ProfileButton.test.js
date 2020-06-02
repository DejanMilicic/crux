import React from "react";
import { ProfileButton } from "./ProfileButton";
import { mount } from "enzyme";

describe("<ProfileButton />", () => {
  const props = {
    handleClick: jest.fn()
  };

  it("renders <ProfileButton> with mount - render snapshot", () => {
    const wrapper = mount(<ProfileButton {...props}>test</ProfileButton>);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("button")).toHaveLength(1);
  });
});
