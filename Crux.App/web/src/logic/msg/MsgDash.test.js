import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { PopStore } from "stores/pop";
import MsgDash from "./MsgDash";
import { mount } from "enzyme";

describe("<MsgDash />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const props = {
    list: [
      {
        id: "identity-123",
        name: "name",
        authorId: "identity-999",
        authorName: "name",
        dateModified: "2019-01-01"
      }
    ]
  };

  const pop = {
    statePop: {},
    dispatchPop: jest.fn()
  };

  const Render = (children = <MsgDash {...props} />) => {
    return mount(
      <ThemeProvider theme={theme}>
        <PopStore.Provider value={pop}>{children}</PopStore.Provider>
      </ThemeProvider>
    );
  };

  it("renders <MsgDash> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MsgDash)).toHaveLength(1);
  });
});
