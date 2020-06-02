import React from "react";
import UserOperate from "./userOperate";
import { mount } from "enzyme";

describe("<UserOperate />", () => {
  const props = {};

  it("renders <UserOperate> with mount - render snapshot", () => {
    const wrapper = mount(<UserOperate {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(UserOperate)).toHaveLength(1);
  });
});
