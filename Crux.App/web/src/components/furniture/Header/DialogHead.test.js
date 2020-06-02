import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import { mount } from "enzyme";
import { DialogHead } from "./DialogHead";

describe("<DialogHead />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const props = {
    dispatch: jest.fn(),
    callback: jest.fn()
  };

  const Render = (children = <DialogHead {...props}>Title</DialogHead>) => {
    return mount(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
  };

  it("renders <DialogHead> with mount - render snapshot", () => {
    const wrapper = Render();

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(DialogTitle)).toHaveLength(1);
  });
});
