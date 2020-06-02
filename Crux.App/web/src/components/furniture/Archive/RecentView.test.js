import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { mount } from "enzyme";
import { RecentView } from "./RecentView";
import { MetaLine } from "./MetaLine";
import { DisplayStore } from "stores/display";
import { PopStore } from "stores/pop";

describe("<RecentView />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });
  const empty = { stateDisplay: { archive: [] } };
  const pop = { dispatchPop: jest.fn() };

  const single = {
    stateDisplay: {
      archive: [
        {
          logicId: "id-123",
          logicName: "test",
          logicKey: "testKey",
          logicIcon: "icon",
          logicTitle: "title"
        }
      ]
    }
  };

  const Render = (children = <RecentView />, defaultModel = empty, defaultPop = pop) => {
    return mount(
      <ThemeProvider theme={theme}>
        <PopStore.Provider value={defaultPop}>
          <DisplayStore.Provider value={defaultModel}>{children}</DisplayStore.Provider>
        </PopStore.Provider>
      </ThemeProvider>
    );
  };

  it("renders <RecentView> with mount - render empty", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Paper)).toHaveLength(1);
    expect(wrapper.find(MetaLine)).toHaveLength(0);
  });

  it("renders <RecentView> with mount - render single", () => {
    const wrapper = Render(<RecentView />, single, pop);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Paper)).toHaveLength(1);
    expect(wrapper.find(MetaLine)).toHaveLength(1);
  });
});
