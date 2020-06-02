import React from "react";
import { PopStore } from "stores/pop";
import { Pop } from "./Pop";
import { mount } from "enzyme";

describe("<Pop />", () => {
  const pop = {
    statePop: { show: false, current: {} },
    dispatchPop: jest.fn()
  };

  const Render = (children = <Pop />) => {
    return mount(<PopStore.Provider value={pop}>{children}</PopStore.Provider>);
  };

  it("renders <Pop> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.find(Pop)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
