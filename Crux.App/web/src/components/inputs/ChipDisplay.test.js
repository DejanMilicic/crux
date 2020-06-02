import React from "react";
import { ChipDisplay } from "./ChipDisplay";
import { mount } from "enzyme";
import { PopStore } from "stores/pop";
import Chip from "@material-ui/core/Chip";

describe("<ChipDisplay />", () => {
  const props = {
    value: [{ name: "test", id: "id-123" }],
    handleChange: jest.fn(),
    logicKey: "logicKey"
  };

  const pop = { dispatchPop: jest.fn() };

  const Render = (children = <ChipDisplay {...props} />, defaultPop = pop) => {
    return mount(
      <PopStore.Provider value={defaultPop}>{children}</PopStore.Provider>
    );
  };

  it("renders <ChipDisplay> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Chip)).toHaveLength(1);
  });

  it("renders <ChipDisplay> with mount - simulate click", () => {
    const wrapper = Render();
    wrapper.find(Chip).simulate("click");
    expect(pop.dispatchPop).toHaveBeenCalled();
  });

  it("renders <ChipDisplay> with mount - simulate delete", () => {
    const wrapper = Render();

    wrapper
      .find(".MuiChip-deleteIcon")
      .first()
      .simulate("click");

    expect(props.handleChange).toHaveBeenCalled();
  });
});
