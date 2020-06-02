import React from "react";
import { ClickFab } from "./ClickFab";
import { mount } from "enzyme";
import Fab from "@material-ui/core/Fab";

describe("<ClickFab />", () => {
  const props = {
    dispatch: jest.fn(),
    callback: jest.fn(),
    aria: "aria-label",
    color: "default"
  };

  it("renders <ClickFab> with mount - render snapshot", () => {
    const wrapper = mount(<ClickFab {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("button")).toHaveLength(1);
  });

  it("renders <ClickFab> with mount - simulate click", () => {
    const wrapper = mount(<ClickFab {...props} />);
    wrapper.find(Fab).simulate("click");
    expect(props.callback).toHaveBeenCalled();
  });
});
