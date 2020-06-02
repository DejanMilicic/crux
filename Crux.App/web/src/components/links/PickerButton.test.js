import React from "react";
import { PopStore } from "stores/pop";
import { PickerButton } from "./PickerButton";
import { mount } from "enzyme";

describe("<PickerButton />", () => {
  const props = {
    aria: "Description",
    logicKey: "meeting",
    handleChange: jest.fn(),
    immediateHandle: false,
    label: "label"
  };

  const pop = { dispatchPop: jest.fn() };

  const Render = (children = <PickerButton {...props}>test</PickerButton>) => {
    return mount(<PopStore.Provider value={pop}>{children}</PopStore.Provider>);
  };

  it("renders <PickerButton> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("button")).toHaveLength(1);
  });

  it("renders <PickerButton> with mount - simulate click", () => {
    const wrapper = Render();
    wrapper.find("button").simulate("click");
    expect(pop.dispatchPop).toHaveBeenCalled();
  });
});
