import React from "react";
import { mount } from "enzyme";
import { RefStore } from "stores/ref";
import { RadioList } from "./RadioList";
import { RadioRef } from "./RadioRef";

describe("<RadioRef />", () => {
  const props = {
    id: "identity-123",
    logicKey: "logicKey",
    label: "label",
    handleChange: jest.fn(),
    params: { search: "test" }
  };

  const logic = {
    logicKey: "logicKey",
    status: { isLoading: false, isFailed: false, isLoaded: true },
    model: {
      data: [{ id: "identity-123", name: "name" }]
    }
  };

  const value = { stateRef: { stored: [logic] }, dispatchRef: jest.fn() };

  const Render = (children = <RadioRef {...props} />, defaultValue = value) => {
    return mount(
      <RefStore.Provider value={value}>{children}</RefStore.Provider>
    );
  };

  it("renders <RadioRef> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(RadioList)).toHaveLength(1);
  });

  it("renders <RadioRef> with mount - render selected", () => {
    const wrapper = Render(
      <RadioRef {...props} value={{ id: "identity-123", name: "name" }} />
    );
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(RadioList)).toHaveLength(1);
  });
});
