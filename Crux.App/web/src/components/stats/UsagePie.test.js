import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { Pie } from "recharts";
import { UsagePie } from "./UsagePie";
import { mount } from "enzyme";

describe("<UsagePie />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const props = {
    legend: "The Title",
    usage: 15,
    total: 50
  };

  const Render = (children = <UsagePie {...props} />) => {
    return mount(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
  };

  it("renders <UsagePie> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Pie)).toHaveLength(1);
  });
});
