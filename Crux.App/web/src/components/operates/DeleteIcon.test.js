import React from "react";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import { PopStore } from "stores/pop";
import { DeleteIcon } from "./DeleteIcon";
import { mount } from "enzyme";

describe("<DeleteIcon />", () => {
  const props = {
    color: "inherit",
    logicId: "identity-123",
    logicKey: "meeting"
  };

  const pop = { dispatchPop: jest.fn() };

  const Render = (children = <DeleteIcon {...props} />) => {
    return mount(<PopStore.Provider value={pop}>{children}</PopStore.Provider>);
  };

  it("renders <DeleteIcon> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Icon)).toHaveLength(1);
  });

  it("renders <DeleteIcon> with mount - simulate click", () => {
    const wrapper = Render();
    wrapper.find(IconButton).simulate("click");
    expect(pop.dispatchPop).toHaveBeenCalled();
  });
});
