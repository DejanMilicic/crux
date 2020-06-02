import React from "react";
import { FormStatus } from "./FormStatus";
import { mount } from "enzyme";

describe("<FormStatus />", () => {
  it("renders <FormStatus> with mount - render none", () => {
    const wrapper = mount(
      <FormStatus status={{ isLoading: false, isFailed: false }} />
    );
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("span")).toHaveLength(0);
  });

  it("renders <FormStatus> with mount - render isLoading", () => {
    const wrapper = mount(
      <FormStatus status={{ isLoading: true, isFailed: false }} />
    );
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("span")).toHaveLength(1);
  });

  it("renders <FormStatus> with mount - render isFailed", () => {
    const wrapper = mount(
      <FormStatus status={{ isLoading: false, isFailed: true }} />
    );
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("span")).toHaveLength(1);
  });
});
