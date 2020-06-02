import React from "react";
import { PopStore } from "stores/pop";
import { ResetPwdDraw } from "./ResetPwdDraw";
import { mount } from "enzyme";
import ListItem from "@material-ui/core/ListItem";

describe("<ResetPwdDraw />", () => {
  const props = {};

  const pop = { dispatchPop: jest.fn() };

  const Render = (children = <ResetPwdDraw {...props}>test</ResetPwdDraw>) => {
    return mount(<PopStore.Provider value={pop}>{children}</PopStore.Provider>);
  };

  it("renders <ResetPwdDraw> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(ResetPwdDraw)).toHaveLength(1);
  });

  it("renders <ResetPwdDraw> with mount - simulate click", () => {
    const wrapper = Render();
    wrapper.find(ListItem).simulate("click");
    expect(pop.dispatchPop).toHaveBeenCalled();
  });
});
