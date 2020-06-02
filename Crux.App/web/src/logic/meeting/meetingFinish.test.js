import React from "react";
import MeetingFinish from "./meetingFinish";
import { mount } from "enzyme";

describe("<MeetingFinish />", () => {
  const props = {};

  it("renders <MeetingFinish> with mount - render snapshot", () => {
    const wrapper = mount(<MeetingFinish {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MeetingFinish)).toHaveLength(1);
  });
});
