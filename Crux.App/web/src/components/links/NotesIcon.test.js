import React from "react";
import { PopStore } from "stores/pop";
import { NotesIcon } from "./NotesIcon";
import { mount } from "enzyme";

describe("<NotesIcon />", () => {
  const props = {
    color: "inherit",
    logicId: "/edit/user/123",
    logicKey: "meeting"
  };

  const pop = { dispatchPop: jest.fn() };

  const Render = (children = <NotesIcon {...props}>test</NotesIcon>) => {
    return mount(<PopStore.Provider value={pop}>{children}</PopStore.Provider>);
  };

  it("renders <NotesIcon> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("button")).toHaveLength(1);
  });

  it("renders <NotesIcon> with mount - simulate click", () => {
    const wrapper = Render();
    wrapper.find("button").simulate("click");
    expect(pop.dispatchPop).toHaveBeenCalled();
  });
});
