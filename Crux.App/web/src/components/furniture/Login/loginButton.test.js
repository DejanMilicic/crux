import React from "react";
import { mount } from "enzyme";
import Button from "@material-ui/core/Button";
import { LoginButton } from "./loginButton";

describe("<LoginButton />", () => {
  const props = { handleValidation: jest.fn() };

  it("renders <LoginButton> with mount - render snapshot", () => {
    const wrapper = mount(<LoginButton {...props}>Login</LoginButton>);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Button)).toHaveLength(1);
  });
});
