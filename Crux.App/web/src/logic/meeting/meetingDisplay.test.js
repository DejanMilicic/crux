import React from "react";
import MeetingDisplay from "./meetingDisplay";
import { mount } from "enzyme";

describe("<MeetingDisplay />", () => {
  const props = {
    model: {
      id: "identity-123",
      name: "name",
      when: "2019-01-01",
      participants: []
    }
  };

  it("renders <MeetingDisplay> with mount - render snapshot", () => {
    const wrapper = mount(<MeetingDisplay {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MeetingDisplay)).toHaveLength(1);
  });
});
