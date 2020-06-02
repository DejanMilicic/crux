import React from "react";
import MsgFinish from "./msgFinish";
import { mount } from "enzyme";

describe("<MsgFinish />", () => {
  const props = {};

  it("renders <MsgFinish> with mount - render snapshot", () => {
    const wrapper = mount(<MsgFinish {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MsgFinish)).toHaveLength(1);
  });
});
