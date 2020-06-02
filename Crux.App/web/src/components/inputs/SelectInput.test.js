import React from "react";
import { mount } from "enzyme";
import { PopStore } from "stores/pop";
import TextField from "@material-ui/core/TextField";
import { SelectInput } from "./SelectInput";

describe("<SelectInput />", () => {
  const props = {
    id: "identity-123",
    label: "label",
    name: "name",
    logicKey: "meeting",
    handleChange: jest.fn()
  };

  const pop = { dispatchPop: jest.fn() };

  const Render = (children = <SelectInput {...props} />, defaultPop = pop) => {
    return mount(
      <PopStore.Provider value={defaultPop}>{children}</PopStore.Provider>
    );
  };

  it("renders <SelectInput> with mount to test", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(TextField)).toHaveLength(1);
  });
});
