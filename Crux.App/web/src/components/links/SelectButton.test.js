import React from "react";
import { PopStore } from "stores/pop";
import { SelectButton } from "./SelectButton";
import { mount } from "enzyme";

describe("<SelectButton />", () => {
  const props = {
    aria: "Description",
    logicKey: "meeting",
    label: "label",
    handleChange: jest.fn()
  };

  const pop = { dispatchPop: jest.fn() };

  const Render = (children = <SelectButton {...props}>test</SelectButton>) => {
    return mount(<PopStore.Provider value={pop}>{children}</PopStore.Provider>);
  };

  it("renders <SelectButton> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("button")).toHaveLength(1);
  });

  it("renders <SelectButton> with mount - simulate click", () => {
    const wrapper = Render();
    wrapper.find("button").simulate("click");
    expect(pop.dispatchPop).toHaveBeenCalled();
  });
});
