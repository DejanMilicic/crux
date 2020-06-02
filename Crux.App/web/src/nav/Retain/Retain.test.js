import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { PopStore } from "stores/pop";
import { RetainStore } from "stores/retain";
import Fab from "@material-ui/core/Fab";
import { Retain } from "./Retain";
import { mount } from "enzyme";

describe("<Retain />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const pop = {
    statePop: {},
    dispatchPop: jest.fn()
  };

  const retain = {
    stateRetain: {
      show: true,
      stored: [{ logicId: "identity-123", logicKey: "user" }]
    },
    dispatchRetain: jest.fn()
  };

  const retainStored = {
    ...retain,
    stateRetain: {
      show: true,
      stored: [{ logicId: "identity-123", logicKey: "user", isDialog: true }]
    }
  };

  const retainAdd = {
    stateRetain: {
      show: true,
      stored: [{ logicKey: "user" }]
    },
    dispatchRetain: jest.fn()
  };

  const Render = (children = <Retain />, defaultRetain = retain) => {
    return mount(
      <ThemeProvider theme={theme}>
        <PopStore.Provider value={pop}>
          <RetainStore.Provider value={defaultRetain}>
            {children}
          </RetainStore.Provider>
        </PopStore.Provider>
      </ThemeProvider>
    );
  };

  it("renders <Retain> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.find(Retain)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Retain> with mount - simulate click canvas", () => {
    const wrapper = Render();
    wrapper
      .find(Fab)
      .first()
      .simulate("click");
    expect(retain.dispatchRetain).toHaveBeenCalled();
  });

  it("renders <Retain> with mount - simulate click dialog", () => {
    const wrapper = Render(<Retain />, retainStored);
    wrapper
      .find(Fab)
      .first()
      .simulate("click");
    expect(retain.dispatchRetain).toHaveBeenCalled();
  });

  it("renders <Retain> with mount - simulate click canvas", () => {
    const wrapper = Render(<Retain />, retainAdd);
    wrapper
      .find(Fab)
      .first()
      .simulate("click");
    expect(retain.dispatchRetain).toHaveBeenCalled();
  });
});
