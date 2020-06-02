import React from "react";
import { NullLoader } from "./NullLoader";
import { mount } from "enzyme";

describe("<NullLoader />", () => {
  it("renders <NullLoader> with mount - render snapshot", () => {
    const wrapper = mount(<NullLoader />);
    expect(wrapper.find(NullLoader)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
