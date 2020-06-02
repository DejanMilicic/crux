import React from "react";
import { PopStore } from "stores/pop";
import MeetingOperate from "./meetingOperate";
import { mount } from "enzyme";

describe("<MeetingOperate />", () => {
  const props = {
    logicKey: "meeting",
    model: { id: "identity-123" },
    color: "primary"
  };

  const pop = {
    statePop: {},
    dispatchPop: jest.fn()
  };

  const Render = (children = <MeetingOperate {...props} />) => {
    return mount(<PopStore.Provider value={pop}>{children}</PopStore.Provider>);
  };

  it("renders <MeetingOperate> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MeetingOperate)).toHaveLength(1);
  });
});
