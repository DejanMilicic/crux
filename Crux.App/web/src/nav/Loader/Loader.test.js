import React from "react";
import { Loader } from "./Loader";
import { mount } from "enzyme";

describe("<Loader />", () => {
  it("renders <Loader> with mount - render snapshot", () => {
    const wrapper = mount(<Loader />);
    expect(wrapper.find(Loader)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
