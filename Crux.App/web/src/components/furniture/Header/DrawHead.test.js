import React from "react";
import { DrawHead } from "./DrawHead";
import { mount } from "enzyme";

describe("<DashHead />", () => {
  const props = {
    dispatch: jest.fn(),
    callback: jest.fn()
  };

  it("renders <DrawHead> with mount to test", () => {
    const wrapper = mount(<DrawHead {...props} />);

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("h4")).toHaveLength(1);
    expect(wrapper.find("CloseIcon")).toHaveLength(1);
  });
});
