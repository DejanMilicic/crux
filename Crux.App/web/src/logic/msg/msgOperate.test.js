import React from "react";
import { PopStore } from "stores/pop";
import MsgOperate from "./msgOperate";
import { mount } from "enzyme";

describe("<MsgOperate />", () => {
  const props = {
    logicKey: "msg",
    model: { id: "identity-123" },
    color: "primary",
  };

  const pop = {
    statePop: {},
    dispatchPop: jest.fn(),
  };

  const Render = (children = <MsgOperate {...props} />) => {
    return mount(<PopStore.Provider value={pop}>{children}</PopStore.Provider>);
  };

  it("renders <MsgOperate> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MsgOperate)).toHaveLength(1);
  });
});
