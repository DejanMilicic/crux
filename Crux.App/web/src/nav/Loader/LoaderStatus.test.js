import React from "react";
import { LoaderStatus } from "./LoaderStatus";
import { mount } from "enzyme";

describe("<LoaderStatus />", () => {
  it("renders <LoaderStatus> with mount - render snapshot", () => {
    const wrapper = mount(<LoaderStatus />);
    expect(wrapper.find(LoaderStatus)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
