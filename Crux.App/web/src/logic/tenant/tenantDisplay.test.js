import React from "react";
import TenantDisplay from "./tenantDisplay";
import { mount } from "enzyme";

describe("<TenantDisplay />", () => {
  const props = {
    model: {
      id: "identity-123",
      name: "name",
      profile: "profile-123",
      profileThumbUrl: "https://img.com/img.png"
    }
  };

  it("renders <TenantDisplay> with mount - render snapshot", () => {
    const wrapper = mount(<TenantDisplay {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(TenantDisplay)).toHaveLength(1);
  });
});
