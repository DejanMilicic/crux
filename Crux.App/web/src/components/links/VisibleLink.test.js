import React from "react";
import { PopStore } from "stores/pop";
import { VisibleLink } from "./VisibleLink";
import { mount } from "enzyme";

describe("<VisibleLink />", () => {
  const props = { logicId: "images-1" };

  const pop = { dispatchPop: jest.fn() };

  const Render = (children = <VisibleLink {...props}>test</VisibleLink>) => {
    return mount(<PopStore.Provider value={pop}>{children}</PopStore.Provider>);
  };

  it("renders <VisibleLink> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("a")).toHaveLength(1);
  });

  it("renders <VisibleLink> with mount - simulate click", () => {
    const wrapper = Render();
    wrapper.find("a").simulate("click");
    expect(pop.dispatchPop).toHaveBeenCalled();
  });
});
