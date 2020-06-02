import React from "react";
import { mount } from "enzyme";
import { Submit, Cancel } from "components/inputs";
import { FormSubmit } from "./FormSubmit";

describe("<FormSubmit />", () => {
  const props = {
    dispatch: jest.fn(),
    callback: jest.fn(),
    disabled: false,
    logicKey: "logicKey",
    viewModel: {}
  };

  it("renders <FormSubmit> with mount - render dialog", () => {
    const wrapper = mount(<FormSubmit {...props} isDialog />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Submit)).toHaveLength(1);
    expect(wrapper.find(Cancel)).toHaveLength(1);
    expect(wrapper.find("button")).toHaveLength(2);
  });

  it("renders <FormSubmit> with mount - render canvas", () => {
    const wrapper = mount(<FormSubmit {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Submit)).toHaveLength(1);
    expect(wrapper.find(Cancel)).toHaveLength(1);
    expect(wrapper.find("button")).toHaveLength(2);
  });
});
