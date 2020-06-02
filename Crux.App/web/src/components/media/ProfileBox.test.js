import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { mount } from "enzyme";
import Box from "@material-ui/core/Box";
import { ProfileBox } from "./ProfileBox";

describe("<ProfileBox />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const props = {
    handleFile: jest.fn()
  };

  const Render = (children = <ProfileBox {...props}>test</ProfileBox>) => {
    return mount(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
  };

  it("renders <ProfileBox> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Box)).toHaveLength(3);
  });
});
