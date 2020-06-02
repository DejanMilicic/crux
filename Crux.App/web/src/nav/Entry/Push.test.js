import React from "react";
import { Push } from "./Push";
import { mount } from "enzyme";

describe("<Push />", () => {
  const user = {
    id: "identity-1",
    tenantId: "tenant-1"
  };

  it("renders <Push> with mount - render snapshot", () => {
    const wrapper = mount(<Push user={user}>Content</Push>);
    expect(wrapper.find(Push)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
