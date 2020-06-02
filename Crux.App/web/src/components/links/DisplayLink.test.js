import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { mount } from "enzyme";
import { PopStore } from "stores/pop";
import Link from "@material-ui/core/Link";
import { DisplayLink } from "./DisplayLink";

describe("<DisplayLink />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const props = {
    logicKey: "logicKey",
    logicId: "identity-123",
    color: "primary"
  };

  const pop = { dispatchPop: jest.fn() };

  const Render = (children = <DisplayLink {...props}>Test</DisplayLink>) => {
    return mount(
      <ThemeProvider theme={theme}>
        <PopStore.Provider value={pop}>>{children}</PopStore.Provider>{" "}
      </ThemeProvider>
    );
  };

  it("renders <DisplayLink> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Link)).toHaveLength(1);
  });

  it("renders <DisplayLink> with mount - simulate click", () => {
    const wrapper = Render();
    wrapper.find(Link).simulate("click");
    expect(pop.dispatchPop).toHaveBeenCalled();
  });
});
