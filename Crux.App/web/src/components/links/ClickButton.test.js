import React from "react";
import { ClickButton } from "./ClickButton";
import { mount } from "enzyme";
import Button from "@material-ui/core/Button";

describe("<ClickButton />", () => {
  const props = {
    dispatch: jest.fn(),
    callback: jest.fn(),
    aria: "aria-label",
    color: "inherit",
    fontSize: "small",
    variant: "text"
  };

  it("renders <ClickButton> with mount - render snapshot", () => {
    const wrapper = mount(<ClickButton {...props}>test</ClickButton>);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("button")).toHaveLength(1);
  });

  it("renders <ClickButton> with mount - simulate close", () => {
    const wrapper = mount(<ClickButton {...props}>test</ClickButton>);
    wrapper.find(Button).simulate("click");
    expect(props.callback).toHaveBeenCalled();
  });
});
