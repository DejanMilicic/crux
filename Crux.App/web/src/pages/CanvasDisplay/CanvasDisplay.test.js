import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { DisplayStore } from "stores/display";
import { UserStore } from "stores/user";
import { CanvasDisplay } from "./CanvasDisplay";
import { mount } from "enzyme";

describe("<CanvasDisplay />", () => {
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

  const empty = {
    stateDisplay: {
      status: {
        isLoading: false,
        isFailed: false
      },
      stored: []
    },
    dispatchDisplay: jest.fn()
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

  const Render = (
    children = <CanvasDisplay {...props} />,
    defaultDisplay = display
  ) => {
    return mount(
      <ThemeProvider theme={theme}>
        <DisplayStore.Provider value={defaultDisplay}>
          <UserStore.Provider value={user}>{children}</UserStore.Provider>
        </DisplayStore.Provider>
      </ThemeProvider>
    );
  };

  it("renders <CanvasDisplay> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.find(CanvasDisplay)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <CanvasDisplay> with mount - render snapshot empty", () => {
    const wrapper = Render(<CanvasDisplay {...props} />, empty);
    expect(wrapper.find(CanvasDisplay)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
