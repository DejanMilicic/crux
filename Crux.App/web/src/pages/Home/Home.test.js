import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { DisplayStore } from "stores/display";
import { LoaderStore } from "stores/loader";
import { DashStore } from "stores/dash";
import { ModelStore } from "stores/model";
import { PopStore } from "stores/pop";
import { Home } from "./Home";
import { mount } from "enzyme";

describe("<Home />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const props = {
    logicId: "meeting-123-A",
    logicKey: "meeting"
  };

  const display = {
    stateDisplay: {
      status: {
        isLoading: false,
        isFailed: false,
        isLoaded: true
      },
      archive: [
        { logicId: "meeting-123-A", logicKey: "meeting", logicIcon: "hand" }
      ]
    },
    dispatchDisplay: jest.fn()
  };

  const loader = {
    stateLoader: {},
    dispatchLoader: jest.fn()
  };

  const dash = {
    stateDash: {
      status: {
        isLoading: false,
        isFailed: false,
        isLoaded: true
      },
      data: {
        tenant: {
          fileMB: 10,
          limitMB: 20,
          userCount: 5,
          userLimit: 10
        },
        meetings: [],
        attendance: [],
        msg: []
      }
    },
    dispatchDash: jest.fn()
  };

  const model = {
    stateModel: {
      status: {
        isLoading: false,
        isFailed: false,
        isLoaded: true
      },
      archive: [
        { logicId: "meeting-123-A", logicKey: "meeting", logicIcon: "hand" }
      ]
    },
    dispatchModal: jest.fn()
  };

  const pop = {
    statePop: {},
    dispatchPop: jest.fn()
  };

  const Render = (children = <Home {...props} />) => {
    return mount(
      <ThemeProvider theme={theme}>
        <DisplayStore.Provider value={display}>
          <LoaderStore.Provider value={loader}>
            <DashStore.Provider value={dash}>
              <ModelStore.Provider value={model}>
                <PopStore.Provider value={pop}>{children}</PopStore.Provider>
              </ModelStore.Provider>
            </DashStore.Provider>
          </LoaderStore.Provider>
        </DisplayStore.Provider>
      </ThemeProvider>
    );
  };

  it("renders <Home> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.find(Home)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
