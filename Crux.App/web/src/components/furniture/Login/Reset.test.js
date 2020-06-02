import React from "react";
import * as axios from "axios";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { mount } from "enzyme";
import { Reset } from "./Reset";
import { Pwd, FormStatus } from "components/inputs";
import { UserStore } from "stores/user";

jest.mock("axios");

describe("<Reset />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const user = {
    stateUser: { status: { isLoading: false, isFailed: false }, forgot: { email: "", code: "" } },
    dispatchUser: jest.fn(),
  };

  const Render = (children = <Reset />, defaultUser = user) => {
    return mount(
      <ThemeProvider theme={theme}>
        <UserStore.Provider value={defaultUser}>{children}</UserStore.Provider>
      </ThemeProvider>
    );
  };

  it("renders <Reset> with mount - render snapshot", () => {
    const wrapper = Render();

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Pwd)).toHaveLength(2);
    expect(wrapper.find(FormStatus)).toHaveLength(1);
  });

  it("renders <Reset> with mount - simulate handleSubmit", () => {
    axios.post.mockImplementation(() => Promise.resolve({ data: {} }));

    const wrapper = Render();

    wrapper
      .find("input")
      .first()
      .simulate("change", { target: { value: "code" } });

    wrapper
      .find("input")
      .last()
      .simulate("change", { target: { value: "code" } });

    wrapper.find("form").simulate("submit");

    expect(user.dispatchUser).toHaveBeenCalled();
  });
});
