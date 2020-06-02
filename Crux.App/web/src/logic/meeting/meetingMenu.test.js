import React from "react";
import { PopStore } from "stores/pop";
import MeetingMenu from "./meetingMenu";
import { mount } from "enzyme";

describe("<MeetingMenu />", () => {
  const props = { logicKey: "meetings", model: { id: "identity-123", noteCount: 3 } };

  const pop = {
    statePop: {},
    dispatchPop: jest.fn(),
  };

  const Render = (children = <MeetingMenu {...props} />) => {
    return mount(<PopStore.Provider value={pop}>{children}</PopStore.Provider>);
  };

  it("renders <MeetingMenu> with mount - render snapshot", () => {
    const wrapper = Render(<MeetingMenu {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MeetingMenu)).toHaveLength(1);
  });
});
