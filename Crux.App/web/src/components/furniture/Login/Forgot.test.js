import React from "react";
import * as axios from "axios";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { mount } from "enzyme";
import { Forgot } from "./Forgot";
import { Email, FormStatus } from "components/inputs";
import { UserStore } from "stores/user";

jest.mock("axios");

describe("<Forgot />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const user = {
    stateUser: { status: { isLoading: false, isFailed: false } },
    dispatchUser: jest.fn(),
  };

  const Render = (children = <Forgot />, defaultUser = user) => {
    return mount(
      <ThemeProvider theme={theme}>
        <UserStore.Provider value={defaultUser}>{children}</UserStore.Provider>
      </ThemeProvider>
    );
  };

  it("renders <Forgot> with mount - render snapshot", () => {
    const wrapper = Render();

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Email)).toHaveLength(1);
    expect(wrapper.find(FormStatus)).toHaveLength(1);
  });

  it("renders <Forgot> with mount - simulate handleSubmit", () => {
    axios.post.mockImplementation(() => Promise.resolve({ data: {} }));

    const wrapper = Render();

    wrapper
      .find("input")
      .first()
      .simulate("change", { target: { value: "test@test.com" } });

    wrapper.find("form").simulate("submit");

    expect(user.dispatchUser).toHaveBeenCalled();
  });
});
