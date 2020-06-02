import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { DisplayStore } from "stores/display";
import { DeleteStore } from "stores/delete";
import { LoaderStore } from "stores/loader";
import { UserStore } from "stores/user";
import { CanvasDeleted } from "./CanvasDeleted";
import { mount } from "enzyme";

describe("<CanvasDeleted />", () => {
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
      stored: [{ logicId: "meeting-123-A", logicKey: "meeting" }]
    },
    dispatchDisplay: jest.fn()
  };

  const remove = {
    stateDelete: {},
    dispatchDelete: jest.fn()
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

  const Render = (children = <CanvasDeleted {...props} />) => {
    return mount(
      <ThemeProvider theme={theme}>
        <DeleteStore.Provider value={remove}>
          <DisplayStore.Provider value={display}>
            <LoaderStore.Provider value={loader}>
              <UserStore.Provider value={user}>{children}</UserStore.Provider>
            </LoaderStore.Provider>
          </DisplayStore.Provider>
        </DeleteStore.Provider>
      </ThemeProvider>
    );
  };

  it("renders <CanvasDeleted> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.find(CanvasDeleted)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
