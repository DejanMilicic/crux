import React from "react";
import TenantOperate from "./tenantOperate";
import { mount } from "enzyme";

describe("<TenantOperate />", () => {
  const props = {};

  it("renders <TenantOperate> with mount - render snapshot", () => {
    const wrapper = mount(<TenantOperate {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(TenantOperate)).toHaveLength(1);
  });
});
