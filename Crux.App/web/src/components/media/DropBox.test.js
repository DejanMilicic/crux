import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { mount } from "enzyme";
import Box from "@material-ui/core/Box";
import { DropBox } from "./DropBox";

describe("<DropBox />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const props = {
    handleFiles: jest.fn()
  };

  const Render = (children = <DropBox {...props}>test</DropBox>) => {
    return mount(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
  };

  it("renders <DropBox> with mount- render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Box)).toHaveLength(2);
  });
});
