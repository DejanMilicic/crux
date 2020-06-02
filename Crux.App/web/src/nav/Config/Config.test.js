import React from "react";
import { act } from "react-dom/test-utils";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import RadioGroup from "@material-ui/core/RadioGroup";
import Dialog from "@material-ui/core/Dialog";
import { SwitchLabel, TakeRadio, ViewRadio } from "components/inputs";
import { UserStore } from "stores/user";
import { ConfigInput } from "./configInput";
import { Config } from "./Config";
import { mount } from "enzyme";

describe("<Config />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const props = {
    dispatch: jest.fn(),
    callback: jest.fn(),
  };

  const user = {
    stateUser: {
      status: { isLoading: false, isFailed: false },
      config: {
        emailNotify: true,
        smsNotify: false,
        pushNotify: true,
        isTwoFactor: true,
        take: 10,
        templateView: "wall",
      },
      user: {
        hasPhone: false,
      },
    },
    dispatchUser: jest.fn(),
  };

  const Render = (children = <Config {...props} />) => {
    return mount(
      <ThemeProvider theme={theme}>
        <UserStore.Provider value={user}>{children}</UserStore.Provider>
      </ThemeProvider>
    );
  };

  it("renders <Config> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.find(ConfigInput)).toHaveLength(1);
    expect(wrapper.find(Config)).toHaveLength(1);
    expect(wrapper.find(SwitchLabel)).toHaveLength(4);
    expect(wrapper.find(TakeRadio)).toHaveLength(1);
    expect(wrapper.find(ViewRadio)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Config> with mount - simulate change email", () => {
    const wrapper = Render();

    wrapper
      .find("#emailNotify")
      .find("input")
      .simulate("change", { target: { value: true } });

    expect(user.dispatchUser).toHaveBeenCalled();
    expect(wrapper.find(Config)).toHaveLength(1);
    expect(wrapper.find(SwitchLabel)).toHaveLength(4);
    expect(wrapper.find(TakeRadio)).toHaveLength(1);
    expect(wrapper.find(ViewRadio)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Config> with mount - simulate change sms", () => {
    const wrapper = Render();

    wrapper
      .find("#smsNotify")
      .find("input")
      .simulate("change", { target: { value: true } });

    expect(user.dispatchUser).toHaveBeenCalled();
    expect(wrapper.find(Config)).toHaveLength(1);
    expect(wrapper.find(SwitchLabel)).toHaveLength(4);
    expect(wrapper.find(TakeRadio)).toHaveLength(1);
    expect(wrapper.find(ViewRadio)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Config> with mount - simulate change push", () => {
    const wrapper = Render();

    wrapper
      .find("#pushNotify")
      .find("input")
      .simulate("change", { target: { value: true } });

    expect(user.dispatchUser).toHaveBeenCalled();
    expect(wrapper.find(Config)).toHaveLength(1);
    expect(wrapper.find(SwitchLabel)).toHaveLength(4);
    expect(wrapper.find(TakeRadio)).toHaveLength(1);
    expect(wrapper.find(ViewRadio)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Config> with mount - simulate change take", () => {
    const wrapper = Render();

    wrapper
      .find("#takeDefault")
      .find(RadioGroup)
      .simulate("change", { target: { value: 20 } });

    expect(user.dispatchUser).toHaveBeenCalled();
    expect(wrapper.find(Config)).toHaveLength(1);
    expect(wrapper.find(SwitchLabel)).toHaveLength(4);
    expect(wrapper.find(TakeRadio)).toHaveLength(1);
    expect(wrapper.find(ViewRadio)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Config> with mount - simulate change view", () => {
    const wrapper = Render();

    wrapper
      .find("#templateView")
      .find(RadioGroup)
      .simulate("change", { target: { value: "wall" } });

    expect(user.dispatchUser).toHaveBeenCalled();
    expect(wrapper.find(Config)).toHaveLength(1);
    expect(wrapper.find(SwitchLabel)).toHaveLength(4);
    expect(wrapper.find(TakeRadio)).toHaveLength(1);
    expect(wrapper.find(ViewRadio)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Config> with mount - simulate close", () => {
    const wrapper = Render();

    act(() => {
      wrapper.find(Dialog).props().onClose();
    });

    expect(wrapper.find(Config)).toHaveLength(1);
    expect(wrapper.find(SwitchLabel)).toHaveLength(4);
    expect(wrapper.find(TakeRadio)).toHaveLength(1);
    expect(wrapper.find(ViewRadio)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Config> with mount - simulate take radio", () => {
    const wrapper = Render();

    act(() => {
      wrapper.find(TakeRadio).props().handleChange(25);
    });

    expect(wrapper.find(Config)).toHaveLength(1);
    expect(wrapper.find(SwitchLabel)).toHaveLength(4);
    expect(wrapper.find(TakeRadio)).toHaveLength(1);
    expect(wrapper.find(ViewRadio)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Config> with mount - simulate view radio", () => {
    const wrapper = Render();

    act(() => {
      wrapper.find(ViewRadio).props().handleChange("wall");
    });

    expect(wrapper.debug()).toMatchSnapshot();
  });
});
