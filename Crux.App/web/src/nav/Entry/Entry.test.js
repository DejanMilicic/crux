import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { PopStore } from "stores/pop";
import { UserStore } from "stores/user";
import { MenuStore } from "stores/menu";
import { Layout } from "nav";
import { Entry } from "./Entry";
import { mount } from "enzyme";

describe("<Entry />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const user = {
    stateUser: {
      status: {
        isLoading: false,
        isFailed: false,
        isLoaded: true
      },
      right: {
        canSuperUser: false
      },
      isAuth: true
    },
    dispatchUser: jest.fn()
  };

  const menu = {
    stateMenu: {
      burger: {
        isOpen: false
      },
      query: {
        isOpen: false
      },
      settings: {
        isOpen: false
      }
    },
    dispatchMenu: jest.fn()
  };

  const pop = {
    statePop: {},
    dispatchPop: jest.fn()
  };

  const Render = (children = <Entry>Content</Entry>) => {
    return mount(
      <ThemeProvider theme={theme}>
        <PopStore.Provider value={pop}>
          <MenuStore.Provider value={menu}>
            <UserStore.Provider value={user}>{children}</UserStore.Provider>
          </MenuStore.Provider>
        </PopStore.Provider>
      </ThemeProvider>
    );
  };

  it("renders <Entry> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.find(Layout)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
