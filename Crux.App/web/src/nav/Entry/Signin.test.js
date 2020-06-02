import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { UserStore } from "stores/user";
import { Signin } from "./Signin";
import { mount } from "enzyme";

describe("<Signin />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const user = {
    stateUser: {
      status: {
        isLoading: false,
        isFailed: false,
        isLoaded: true
      },
      isAuth: false
    },
    dispatchUser: jest.fn()
  };

  const Render = (children = <Signin />) => {
    return mount(
      <ThemeProvider theme={theme}>
        <UserStore.Provider value={user}>{children}</UserStore.Provider>
      </ThemeProvider>
    );
  };

  it("renders <Signin> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.find(Signin)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
