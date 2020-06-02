import React from "react";
import UserFinish from "./userFinish";
import { mount } from "enzyme";

describe("<UserFinish />", () => {
  const props = {};

  it("renders <UserFinish> with mount - render snapshot", () => {
    const wrapper = mount(<UserFinish {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(UserFinish)).toHaveLength(1);
  });
});
