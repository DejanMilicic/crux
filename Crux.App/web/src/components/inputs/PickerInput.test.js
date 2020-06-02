import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { mount } from "enzyme";
import { PopStore } from "stores/pop";
import { PickerButton } from "components/links";
import { PickerInput } from "./PickerInput";

describe("<PickerInput />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const props = {
    logicKey: "logicKey",
    label: "label",
    value: [{ id: "identity-123", name: "name" }],
    handleChange: jest.fn(),
    immediateHandle: false
  };

  const pop = { dispatchPop: jest.fn() };

  const Render = (children = <PickerInput {...props} />, defaultPop = pop) => {
    return mount(
      <ThemeProvider theme={theme}>
        <PopStore.Provider value={defaultPop}>{children}</PopStore.Provider>
      </ThemeProvider>
    );
  };

  it("renders <PickerInput> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(PickerButton)).toHaveLength(1);
  });

  it("renders <PickerInput> with mount - render required", () => {
    const wrapper = Render(<PickerInput {...props} required />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(PickerButton)).toHaveLength(1);
  });
});
