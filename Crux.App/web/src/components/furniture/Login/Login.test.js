import React from "react";
import * as axios from "axios";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { mount } from "enzyme";
import { Login } from "./Login";
import { Email, FormStatus, Pwd, CheckLabel } from "components/inputs";
import { UserStore } from "stores/user";

jest.mock("axios");

describe("<Login />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const user = {
    stateUser: { status: { isLoading: false, isFailed: false } },
    dispatchUser: jest.fn()
  };

  const Render = (children = <Login />, defaultUser = user) => {
    return mount(
      <ThemeProvider theme={theme}>
        <UserStore.Provider value={defaultUser}>{children}</UserStore.Provider>
      </ThemeProvider>
    );
  };

  it("renders <Login> with mount - render snapshot", () => {
    const wrapper = Render();

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Email)).toHaveLength(1);
    expect(wrapper.find(FormStatus)).toHaveLength(1);
    expect(wrapper.find(Pwd)).toHaveLength(1);
    expect(wrapper.find(CheckLabel)).toHaveLength(1);
  });

  it("renders <Login> with mount - simulate handleSubmit", () => {
    axios.post.mockImplementation(() => Promise.resolve({ data: {} }));

    const wrapper = Render();

    wrapper
      .find("input")
      .first()
      .simulate("change", { target: { value: "test@test.com" } });

    wrapper.find("input[type='password']").simulate("change", { target: { value: "Password1" } });

    wrapper.find("form").simulate("submit");

    expect(user.dispatchUser).toHaveBeenCalled();
  });
});
