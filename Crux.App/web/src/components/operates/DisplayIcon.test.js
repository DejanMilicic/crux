import React from "react";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import { PopStore } from "stores/pop";
import { DisplayIcon } from "./DisplayIcon";
import { mount } from "enzyme";

describe("<DisplayIcon />", () => {
  const props = {
    color: "inherit",
    logicId: "identity-123",
    logicKey: "meeting"
  };

  const pop = { dispatchPop: jest.fn() };

  const Render = (children = <DisplayIcon {...props} />) => {
    return mount(<PopStore.Provider value={pop}>{children}</PopStore.Provider>);
  };

  it("renders <DisplayIcon> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Icon)).toHaveLength(1);
  });

  it("renders <DisplayIcon> with mount - simulate click", () => {
    const wrapper = Render();
    wrapper.find(IconButton).simulate("click");
    expect(pop.dispatchPop).toHaveBeenCalled();
  });
});
