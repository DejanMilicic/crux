import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { mount } from "enzyme";
import { DashHead } from "./DashHead";

describe("<DashHead />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });
  const props = { logicKey: "meeting" };

  const Render = (children = <DashHead {...props}>Title</DashHead>) => {
    return mount(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
  };

  it("renders <DashHead> with mount - render snapshot", () => {
    const wrapper = Render();

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Typography)).toHaveLength(2);
  });
});
