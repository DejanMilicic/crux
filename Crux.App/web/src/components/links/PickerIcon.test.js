import React from "react";
import { PopStore } from "stores/pop";
import { PickerIcon } from "./PickerIcon";
import { mount } from "enzyme";

describe("<PickerIcon />", () => {
  const props = {
    color: "inherit",
    logicKey: "meeting",
    handleChange: jest.fn(),
    label: "label"
  };

  const pop = { dispatchPop: jest.fn() };

  const Render = (children = <PickerIcon {...props}>test</PickerIcon>) => {
    return mount(<PopStore.Provider value={pop}>{children}</PopStore.Provider>);
  };

  it("renders <PickerIcon> with mount to test", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("button")).toHaveLength(1);
  });

  it("renders <PickerIcon> with mount to test", () => {
    const wrapper = Render();
    wrapper.find("button").simulate("click");
    expect(pop.dispatchPop).toHaveBeenCalled();
  });
});
