import React from "react";
import MsgDisplay from "./msgDisplay";
import { mount } from "enzyme";

describe("<MsgDisplay />", () => {
  const props = {
    model: {
      id: "identity-123",
      name: "name",
      text: "test",
      dateCreated: "2025-01-01",
    },
  };

  it("renders <MsgDisplay> with mount - render snapshot", () => {
    const wrapper = mount(<MsgDisplay {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MsgDisplay)).toHaveLength(1);
  });
});
