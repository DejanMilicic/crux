import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { mount } from "enzyme";
import { RecentEdit } from "./RecentEdit";
import { MetaLine } from "./MetaLine";
import { ModelStore } from "stores/model";
import { PopStore } from "stores/pop";

describe("<RecentEdit />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });
  const pop = { dispatchPop: jest.fn() };

  const empty = { stateModel: { archive: [] } };

  const single = {
    stateModel: {
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

  const Render = (children = <RecentEdit />, defaultModel = empty, defaultPop = pop) => {
    return mount(
      <ThemeProvider theme={theme}>
        <PopStore.Provider value={defaultPop}>
          <ModelStore.Provider value={defaultModel}>{children}</ModelStore.Provider>
        </PopStore.Provider>
      </ThemeProvider>
    );
  };

  it("renders <RecentEdit> with mount - render empty", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Paper)).toHaveLength(1);
    expect(wrapper.find(MetaLine)).toHaveLength(0);
  });

  it("renders <RecentEdit> with mount - render single", () => {
    const wrapper = Render(<RecentEdit />, single, pop);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Paper)).toHaveLength(1);
    expect(wrapper.find(MetaLine)).toHaveLength(1);
  });
});
