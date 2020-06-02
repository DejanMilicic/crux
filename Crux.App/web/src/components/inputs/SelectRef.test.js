import React from "react";
import { mount } from "enzyme";
import { RefStore } from "stores/ref";
import { SelectList } from "./SelectList";
import { SelectRef } from "./SelectRef";

describe("<SelectRef />", () => {
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

  const ref = { stateRef: { stored: [logic] }, dispatchRef: jest.fn() };

  const refUnloaded = {
    stateRef: { stored: [] },
    dispatchRef: jest.fn()
  };

  const Render = (children = <SelectRef {...props} />, defaultRef = ref) => {
    return mount(
      <RefStore.Provider value={defaultRef}>{children}</RefStore.Provider>
    );
  };

  it("renders <SelectRef> with mount - render snapshot", () => {
    const wrapper = Render(<SelectRef {...props} value="identity-123" />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(SelectList)).toHaveLength(1);
  });

  it("renders <SelectRef> with mount - render selected", () => {
    const wrapper = Render(<SelectRef {...props} value="identity-123" />);
    expect(wrapper.find(SelectList)).toHaveLength(1);
  });

  it("renders <SelectRef> with mount - render unloaded", () => {
    Render(<SelectRef {...props} value="identity-123" />, refUnloaded);
    expect(refUnloaded.dispatchRef).toHaveBeenCalled();
  });

  it("renders <SelectRef> with mount - render with handleChange", () => {
    const wrapper = Render(<SelectRef {...props} required value="" />);
    expect(wrapper.find(SelectList)).toHaveLength(1);
  });
});
