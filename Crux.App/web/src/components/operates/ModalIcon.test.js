import React from "react";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import { PopStore } from "stores/pop";
import { ModalIcon } from "./ModalIcon";
import { mount } from "enzyme";

describe("<ModalIcon />", () => {
  const props = {
    color: "inherit",
    logicKey: "meeting"
  };

  const pop = { dispatchPop: jest.fn() };

  const Render = (children = <ModalIcon {...props} />) => {
    return mount(<PopStore.Provider value={pop}>{children}</PopStore.Provider>);
  };

  it("renders <ModalIcon> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Icon)).toHaveLength(1);
  });

  it("renders <ModalIcon> with mount - simulate click", () => {
    const wrapper = Render();
    wrapper.find(IconButton).simulate("click");
    expect(pop.dispatchPop).toHaveBeenCalled();
  });
});
