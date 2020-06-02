import React from "react";
import { mount } from "enzyme";
import { Submit, Cancel } from "components/inputs";
import { QuerySubmit } from "./QuerySubmit";

describe("<QuerySubmit />", () => {
  const props = {
    dispatch: jest.fn(),
    callback: jest.fn()
  };

  it("renders <QuerySubmit> with mount - render dialog", () => {
    const wrapper = mount(<QuerySubmit {...props} isDialog />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Submit)).toHaveLength(1);
    expect(wrapper.find(Cancel)).toHaveLength(1);
    expect(wrapper.find("button")).toHaveLength(2);
  });

  it("renders <QuerySubmit> with mount - render canvas", () => {
    const wrapper = mount(<QuerySubmit {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Submit)).toHaveLength(1);
    expect(wrapper.find(Cancel)).toHaveLength(1);
    expect(wrapper.find("button")).toHaveLength(2);
  });
});
