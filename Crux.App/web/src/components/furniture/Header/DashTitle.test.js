import React from "react";
import { DashTitle } from "./DashTitle";
import { mount } from "enzyme";

describe("<DashTitle />", () => {
  it("renders <DashTitle> with mount - render snapshot", () => {
    const wrapper = mount(<DashTitle />);

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("h4")).toHaveLength(1);
    expect(wrapper.find("hr")).toHaveLength(1);
  });
});
