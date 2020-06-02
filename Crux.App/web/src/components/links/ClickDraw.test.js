import React from "react";
import { ClickDraw } from "./ClickDraw";
import { mount } from "enzyme";
import ListItem from "@material-ui/core/ListItem";

describe("<ClickDraw />", () => {
  const props = {
    label: "A label",
    dispatch: jest.fn(),
    callback: jest.fn()
  };

  it("renders <ClickDraw> with mount - render snapshot", () => {
    const wrapper = mount(<ClickDraw {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("span")).toHaveLength(3);
  });

  it("renders <ClickDraw> with mount - simulate click", () => {
    const wrapper = mount(<ClickDraw {...props} />);
    wrapper.find(ListItem).simulate("click");
    expect(props.callback).toHaveBeenCalled();
  });
});
