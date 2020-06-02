import React from "react";
import TenantQuery from "./tenantQuery";
import { mount } from "enzyme";

describe("<TenantQuery />", () => {
  const props = {};

  it("renders <TenantQuery> with mount - render snapshot", () => {
    const wrapper = mount(<TenantQuery {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(TenantQuery)).toHaveLength(1);
  });
});
