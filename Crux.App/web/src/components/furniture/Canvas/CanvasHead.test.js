import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { mount } from "enzyme";
import { BackIcon } from "components/links";
import { CanvasHead } from "./CanvasHead";

describe("<CanvasHead />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const Render = (children = <CanvasHead />) => {
    return mount(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
  };

  it("renders <CanvasHead> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(BackIcon)).toHaveLength(1);
  });

  it("renders <CanvasHead> with mount - render with text", () => {
    const wrapper = Render(<CanvasHead>With Header Text</CanvasHead>);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(BackIcon)).toHaveLength(1);
  });
});
