import React from "react";
import TenantFinish from "./tenantFinish";
import { mount } from "enzyme";

describe("<TenantFinish />", () => {
  const props = {};

  it("renders <TenantFinish> with mount - render snapshot", () => {
    const wrapper = mount(<TenantFinish {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(TenantFinish)).toHaveLength(1);
  });
});
