import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { DisplayStore } from "stores/display";
import { DeleteStore } from "stores/delete";
import { LoaderStore } from "stores/loader";
import { UserStore } from "stores/user";
import { DashStore } from "stores/dash";
import { Dash } from "./Dash";
import { mount } from "enzyme";

describe("<Dash />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const props = {
    logicId: "meeting-123-A",
    logicKey: "meeting",
  };

  const display = {
    stateDisplay: {
      status: {
        isLoading: false,
        isFailed: false,
        isLoaded: true,
      },
      stored: [{ logicId: "meeting-123-A", logicKey: "meeting" }],
    },
    dispatchDisplay: jest.fn(),
  };

  const remove = {
    stateDelete: {},
    dispatchDelete: jest.fn(),
  };

  const loader = {
    stateLoader: {},
    dispatchLoader: jest.fn(),
  };

  const user = {
    stateUser: {
      status: {
        isLoading: false,
        isFailed: false,
      },
      config: {
        templateView: "list",
      },
      right: {
        canSuperUser: false,
      },
    },
    dispatchUser: jest.fn(),
  };

  const dash = {
    stateDash: {
      status: {
        isLoading: false,
        isFailed: false,
        isLoaded: true,
      },
      data: {
        tenant: {
          fileMB: 10,
          limitMB: 20,
          userCount: 5,
          userLimit: 10,
        },
        meetings: [],
        attendance: [],
        messages: [],
      },
    },
    dispatchDash: jest.fn(),
  };

  const Render = (children = <Dash {...props} />) => {
    return mount(
      <ThemeProvider theme={theme}>
        <DeleteStore.Provider value={remove}>
          <DisplayStore.Provider value={display}>
            <LoaderStore.Provider value={loader}>
              <UserStore.Provider value={user}>
                <DashStore.Provider value={dash}>{children}</DashStore.Provider>
              </UserStore.Provider>
            </LoaderStore.Provider>
          </DisplayStore.Provider>
        </DeleteStore.Provider>
      </ThemeProvider>
    );
  };

  it("renders <Dash> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.find(Dash)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
