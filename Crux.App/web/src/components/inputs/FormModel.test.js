import React from "react";
import { FormModel } from "./FormModel";
import { mount } from "enzyme";

describe("<FormModel />", () => {
  const props = { dispatch: jest.fn(), logicKey: "logicKey", viewModel: {} };

  it("renders <FormModel> with mount - render snapshot", () => {
    const wrapper = mount(<FormModel {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("form")).toHaveLength(1);
  });

  it("renders <FormModel> with mount - simulate handleSubmit", () => {
    const wrapper = mount(<FormModel {...props} />);
    wrapper.find("form").simulate("submit");
    expect(props.dispatch).toHaveBeenCalled();
  });
});
