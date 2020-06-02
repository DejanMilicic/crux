import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { DisplayStore } from "stores/display";
import { LoaderStore } from "stores/loader";
import { UserStore } from "stores/user";
import { CanvasFinish } from "./CanvasFinish";
import { mount } from "enzyme";

describe("<CanvasFinish />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const props = {
    logicId: "meeting-123-A",
    logicKey: "meeting"
  };

  const loader = {
    stateLoader: {},
    dispatchLoader: jest.fn()
  };

  const user = {
    stateUser: {
      status: {
        isLoading: false,
        isFailed: false
      },
      config: {
        templateView: "list"
      },
      right: {
        canSuperUser: false
      }
    },
    dispatchUser: jest.fn()
  };

  const display = {
    stateDisplay: {
      status: {
        isLoading: false,
        isFailed: false,
        isLoaded: true
      },
      stored: []
    },
    dispatchDisplay: jest.fn()
  };

  const current = {
    stateDisplay: {
      status: {
        isLoading: false,
        isFailed: false,
        isLoaded: true
      },
      stored: [
        {
          logicKey: "meeting",
          current: {
            id: "meeting-123-A",
            name: "name",
            when: "2019-01-01"
          }
        }
      ]
    },
    dispatchDisplay: jest.fn()
  };

  const failed = {
    stateDisplay: {
      status: {
        isLoading: false,
        isFailed: true,
        isLoaded: false
      },
      stored: [{ logicId: "meeting-123-A", logicKey: "meeting" }]
    },
    dispatchDisplay: jest.fn()
  };

  const Render = (
    children = <CanvasFinish {...props} />,
    defaultDisplay = display
  ) => {
    return mount(
      <ThemeProvider theme={theme}>
        <DisplayStore.Provider value={defaultDisplay}>
          <LoaderStore.Provider value={loader}>
            <UserStore.Provider value={user}>{children}</UserStore.Provider>
          </LoaderStore.Provider>
        </DisplayStore.Provider>
      </ThemeProvider>
    );
  };

  it("renders <CanvasFinish> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.find(CanvasFinish)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <CanvasFinish> with mount - render failed", () => {
    const wrapper = Render(<CanvasFinish {...props} />, failed);
    expect(wrapper.find(CanvasFinish)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <CanvasFinish> with mount - render current", () => {
    const wrapper = Render(<CanvasFinish {...props} />, current);
    expect(wrapper.find(CanvasFinish)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
