import React from "react";
import { Errors } from "./Errors";
import { mount } from "enzyme";

describe("<Errors />", () => {
  it("renders <Errors> with mount - render snapshot", () => {
    const wrapper = mount(<Errors>Content</Errors>);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
