import React from "react";
import { act } from "react-dom/test-utils";
import { ResetPwd } from "./ResetPwd";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { UserStore } from "stores/user";
import { OperateStore } from "stores/operate";
import { mount } from "enzyme";

describe("<ResetPwd />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const props = {
    dispatch: jest.fn(),
    callback: jest.fn()
  };

  const user = {
    stateUser: {
      status: { isLoading: false, isFailed: false },
      user: { id: "users-123" }
    },
    dispatchUser: jest.fn()
  };

  const operate = { dispatchOperate: jest.fn() };

  const Render = (children = <ResetPwd {...props} />) => {
    return mount(
      <ThemeProvider theme={theme}>
        <OperateStore.Provider value={operate}>
          <UserStore.Provider value={user}>{children}</UserStore.Provider>
        </OperateStore.Provider>
      </ThemeProvider>
    );
  };

  it("renders <ResetPwd> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.find(ResetPwd)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <ResetPwd> with mount - simulate validation", () => {
    const wrapper = Render();
    wrapper
      .find("#current")
      .find("input[type='password']")
      .simulate("change", { target: { value: "oldPassword" } });
    wrapper
      .find("#replacement")
      .find("input[type='password']")
      .simulate("change", { target: { value: "newPassword" } });
    wrapper
      .find("#replacementMatch")
      .find("input[type='password']")
      .simulate("change", { target: { value: "newPassword" } });
    wrapper
      .find("button")
      .first()
      .simulate("click");
    wrapper.find("form").simulate("submit");

    expect(props.callback).toHaveBeenCalled();
    expect(operate.dispatchOperate).toHaveBeenCalled();
  });

  it("renders <Config> with mount - simulate close", () => {
    const wrapper = Render();

    act(() => {
      wrapper
        .find(Dialog)
        .props()
        .onClose();
    });
  });
});
