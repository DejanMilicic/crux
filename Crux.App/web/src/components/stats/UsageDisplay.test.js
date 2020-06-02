import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { UsageDisplay } from "./UsageDisplay";
import { mount } from "enzyme";

describe("<LineDisplay />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const props = {
    legend: "The Title",
    usage: 15,
    total: 50
  };

  const Render = (children = <UsageDisplay {...props} />) => {
    return mount(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
  };

  it("renders <UsageDisplay> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Paper)).toHaveLength(1);
  });
});
