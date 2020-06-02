import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { mount } from "enzyme";
import Box from "@material-ui/core/Box";
import { CanvasLayout } from "./CanvasLayout";

describe("<CanvasLayout />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });
  const props = { title: "title", icon: "icon", width: "sm" };

  const Render = (children = <CanvasLayout {...props} />) => {
    return mount(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
  };

  it("renders <CanvasLayout> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Box)).toHaveLength(3);
  });

  it("renders <CanvasLayout> with mount - render with text", () => {
    const wrapper = Render(
      <CanvasLayout {...props}>With Header Text</CanvasLayout>
    );
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Box)).toHaveLength(3);
  });
});
