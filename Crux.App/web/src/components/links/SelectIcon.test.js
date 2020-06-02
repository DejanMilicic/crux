import React from "react";
import { PopStore } from "stores/pop";
import { SelectIcon } from "./SelectIcon";
import { mount } from "enzyme";

describe("<SelectIcon />", () => {
  const props = {
    aria: "Description",
    logicKey: "meeting",
    handleChange: jest.fn(),
    label: "label"
  };

  const pop = { dispatchPop: jest.fn() };

  const Render = (children = <SelectIcon {...props}>test</SelectIcon>) => {
    return mount(<PopStore.Provider value={pop}>{children}</PopStore.Provider>);
  };

  it("renders <SelectIcon> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("button")).toHaveLength(1);
  });

  it("renders <SelectIcon> with mount - simulate click", () => {
    const wrapper = Render();
    wrapper.find("button").simulate("click");
    expect(pop.dispatchPop).toHaveBeenCalled();
  });
});
