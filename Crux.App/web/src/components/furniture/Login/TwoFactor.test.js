import React from "react";
import * as axios from "axios";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { mount } from "enzyme";
import { TwoFactor } from "./TwoFactor";
import { ShortText, FormStatus } from "components/inputs";
import { UserStore } from "stores/user";

jest.mock("axios");

describe("<TwoFactor />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const user = {
    stateUser: { status: { isLoading: false, isFailed: false }, user: { id: "" } },
    dispatchUser: jest.fn(),
  };

  const Render = (children = <TwoFactor />, defaultUser = user) => {
    return mount(
      <ThemeProvider theme={theme}>
        <UserStore.Provider value={defaultUser}>{children}</UserStore.Provider>
      </ThemeProvider>
    );
  };

  it("renders <TwoFactor> with mount - render snapshot", () => {
    const wrapper = Render();

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(ShortText)).toHaveLength(1);
    expect(wrapper.find(FormStatus)).toHaveLength(1);
  });

  it("renders <TwoFactor> with mount - simulate handleSubmit", () => {
    axios.post.mockImplementation(() => Promise.resolve({ data: {} }));

    const wrapper = Render();

    wrapper
      .find("input")
      .first()
      .simulate("change", { target: { value: "123456" } });

    wrapper.find("form").simulate("submit");

    expect(user.dispatchUser).toHaveBeenCalled();
  });
});
