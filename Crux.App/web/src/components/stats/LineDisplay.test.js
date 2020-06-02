import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { LineDisplay } from "./LineDisplay";
import { mount } from "enzyme";

describe("<LineDisplay />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const props = {
    title: "A Title"
  };

  const Render = (children = <LineDisplay {...props} />) => {
    return mount(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
  };

  it("renders <LineDisplay> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Paper)).toHaveLength(1);
  });
});
