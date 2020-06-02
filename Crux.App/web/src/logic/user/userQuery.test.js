import React from "react";
import UserQuery from "./userQuery";
import { mount } from "enzyme";

describe("<UserQuery />", () => {
  const props = {};

  it("renders <UserQuery> with mount - render snapshot", () => {
    const wrapper = mount(<UserQuery {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(UserQuery)).toHaveLength(1);
  });
});
