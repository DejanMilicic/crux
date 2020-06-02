import React from "react";
import * as axios from "axios";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import { mount } from "enzyme";
import { ForgetLink } from "./ForgetLink";
import { UserStore } from "stores/user";

jest.mock("axios");

describe("<ForgetLink />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const user = {
    stateUser: { status: { isLoading: false, isFailed: false } },
    dispatchUser: jest.fn(),
  };

  const Render = (children = <ForgetLink />, defaultUser = user) => {
    return mount(
      <ThemeProvider theme={theme}>
        <UserStore.Provider value={defaultUser}>{children}</UserStore.Provider>
      </ThemeProvider>
    );
  };

  it("renders <ForgetLink> with mount - render snapshot", () => {
    const wrapper = Render();

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Box)).toHaveLength(1);
    expect(wrapper.find(Link)).toHaveLength(1);
  });

  it("renders <MsgForgetLink> with mount - simulate click off", () => {
    axios.post.mockImplementation(() => Promise.resolve({ data: {} }));

    const wrapper = Render(<ForgetLink off />);

    wrapper
      .find(Link)
      .first()
      .simulate("click", { target: { value: "test@test.com" } });

    expect(user.dispatchUser).toHaveBeenCalled();
  });

  it("renders <MsgForgetLink> with mount - simulate click on", () => {
    axios.post.mockImplementation(() => Promise.resolve({ data: {} }));

    const wrapper = Render(<ForgetLink on />);

    wrapper
      .find(Link)
      .first()
      .simulate("click", { target: { value: "test@test.com" } });

    expect(user.dispatchUser).toHaveBeenCalled();
  });
});
