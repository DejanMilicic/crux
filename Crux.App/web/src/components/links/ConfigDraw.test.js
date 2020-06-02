import React from "react";
import Icon from "@material-ui/core/Icon";
import { ConfigDraw } from "./ConfigDraw";
import { mount } from "enzyme";
import { PopStore } from "stores/pop";
import ListItem from "@material-ui/core/ListItem";

describe("<ConfigDraw />", () => {
  const pop = { dispatchPop: jest.fn() };

  const Render = (children = <ConfigDraw />) => {
    return mount(<PopStore.Provider value={pop}>{children}</PopStore.Provider>);
  };

  it("renders <ConfigDraw> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Icon)).toHaveLength(1);
  });

  it("renders <ConfigDraw> with mount - simulate click", () => {
    const wrapper = Render();
    wrapper.find(ListItem).simulate("click");
    expect(pop.dispatchPop).toHaveBeenCalled();
  });
});
