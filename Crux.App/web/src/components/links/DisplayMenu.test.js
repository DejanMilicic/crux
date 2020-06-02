import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { PopStore } from "stores/pop";
import { DisplayMenu } from "./DisplayMenu";
import { mount } from "enzyme";

describe("<DisplayMenu />", () => {
  const props = {
    aria: "Description",
    logicId: "identity-123-A",
    logicKey: "meeting",
    handleChange: jest.fn(),
    immediateHandle: false,
    label: "label",
  };

  const pop = { dispatchPop: jest.fn() };

  const Render = (children = <DisplayMenu {...props}>test</DisplayMenu>) => {
    return mount(<PopStore.Provider value={pop}>{children}</PopStore.Provider>);
  };

  it("renders <DisplayMenu> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MenuItem)).toHaveLength(1);
  });

  it("renders <DisplayMenu> with mount - simulate click", () => {
    const wrapper = Render();
    wrapper.find(MenuItem).simulate("click");
    expect(pop.dispatchPop).toHaveBeenCalled();
  });
});
