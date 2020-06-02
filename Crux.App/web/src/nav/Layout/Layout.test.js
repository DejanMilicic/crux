import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { MenuStore } from "stores/menu";
import { UserStore } from "stores/user";
import { PopStore } from "stores/pop";
import { Layout } from "./Layout";
import { mount } from "enzyme";

describe("<Layout />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const menu = {
    stateMenu: {
      burger: { isOpen: false },
      settings: { isOpen: false },
      query: { isOpen: false }
    },
    dispatchMenu: jest.fn()
  };

  const user = {
    stateUser: {
      status: { isLoading: false, isFailed: false },
      config: {
        templateView: "wall"
      },
      right: { canSuperuser: false }
    },
    dispatchUser: jest.fn()
  };

  const pop = { statePop: { show: false }, dispatchPop: jest.fn() };

  const Render = (children = <Layout>Content</Layout>) => {
    return mount(
      <ThemeProvider theme={theme}>
        <PopStore.Provider value={pop}>
          <UserStore.Provider value={user}>
            <MenuStore.Provider value={menu}>{children}</MenuStore.Provider>
          </UserStore.Provider>
        </PopStore.Provider>
      </ThemeProvider>
    );
  };

  it("renders <Layout> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.find(Layout)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
