import React from "react";
import * as axios from "axios";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { mount } from "enzyme";
import { Reply } from "./Reply";
import { ShortText, FormStatus } from "components/inputs";
import { UserStore } from "stores/user";

jest.mock("axios");

describe("<Reply />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const user = {
    stateUser: { status: { isLoading: false, isFailed: false }, forgot: { email: "" } },
    dispatchUser: jest.fn(),
  };

  const Render = (children = <Reply />, defaultUser = user) => {
    return mount(
      <ThemeProvider theme={theme}>
        <UserStore.Provider value={defaultUser}>{children}</UserStore.Provider>
      </ThemeProvider>
    );
  };

  it("renders <Reply> with mount - render snapshot", () => {
    const wrapper = Render();

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(ShortText)).toHaveLength(1);
    expect(wrapper.find(FormStatus)).toHaveLength(1);
  });

  it("renders <Reply> with mount - simulate handleSubmit", () => {
    axios.post.mockImplementation(() => Promise.resolve({ data: {} }));

    const wrapper = Render();

    wrapper
      .find("input")
      .first()
      .simulate("change", { target: { value: "code" } });

    wrapper.find("form").simulate("submit");

    expect(user.dispatchUser).toHaveBeenCalled();
  });
});
