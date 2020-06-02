import React from "react";
import { act } from "react-dom/test-utils";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { mount } from "enzyme";
import Select from "@material-ui/core/Select";
import { SelectList } from "./SelectList";

describe("<SelectList />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const props = {
    id: "identity-123",
    label: "label",
    handleChange: jest.fn(),
    list: [{ id: "identity-123", name: "name" }],
    value: "identity-123"
  };

  const Render = (children = <SelectList {...props} />) => {
    return mount(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
  };

  it("renders <SelectList> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Select)).toHaveLength(1);
  });

  it("renders <SelectList> with mount - render required", () => {
    const wrapper = Render(<SelectList {...props} required />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Select)).toHaveLength(1);
  });

  it("renders <SelectList> with mount - render selected", () => {
    const wrapper = Render(<SelectList {...props} required />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Select)).toHaveLength(1);
  });

  it("renders <SelectList> with mount - simulate handleChange", () => {
    const wrapper = Render();

    act(() => {
      wrapper
        .find(Select)
        .props()
        .onChange({ target: { value: "1234" } });
    });

    expect(wrapper.find(Select)).toHaveLength(1);
  });

  it("renders <SelectList> with mount - simulate handleOpen + handleClose", () => {
    const wrapper = Render();

    act(() => {
      wrapper
        .find(".MuiSelect-root")
        .first()
        .simulate("click");

      wrapper
        .find(Select)
        .props()
        .onClose();
    });

    expect(wrapper.find(Select)).toHaveLength(1);
  });
});
