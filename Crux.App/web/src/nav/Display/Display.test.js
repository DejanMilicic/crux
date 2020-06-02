import React from "react";
import { act } from "react-dom/test-utils";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { DialogOperate, NavOperate } from "components/operates";
import { PopStore } from "stores/pop";
import { DisplayStore } from "stores/display";
import { ListStore } from "stores/list";
import { UserStore } from "stores/user";
import { Display } from "./Display";
import { mount } from "enzyme";

describe("<Display />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const props = {
    logicId: "meeting-123-A",
    logicKey: "meeting",
    dispatch: jest.fn(),
    callback: jest.fn()
  };

  const viewModel = {
    id: "meeting-123-A",
    name: "name",
    when: "2017-1-1",
    participants: []
  };

  const display = {
    stateDisplay: {
      stored: [
        {
          logicKey: "meeting",
          current: {
            id: "meeting-123-A",
            name: "name",
            when: "2017-1-1",
            participants: []
          }
        }
      ],
      status: { isLoading: false, isFailed: false }
    },
    dispatchDisplay: jest.fn()
  };

  const list = {
    stateList: {
      status: {
        isLoading: false,
        isFailed: false
      }
    },
    dispatchList: jest.fn()
  };

  const user = {
    stateUser: {
      status: {
        isLoading: false,
        isFailed: false
      },
      config: {
        templateView: "list"
      },
      right: {
        canSuperUser: false
      }
    },
    dispatchUser: jest.fn()
  };

  const pop = {
    statePop: {},
    dispatchPop: jest.fn()
  };

  const Render = (children = <Display {...props} />) => {
    return mount(
      <ThemeProvider theme={theme}>
        <PopStore.Provider value={pop}>
          <UserStore.Provider value={user}>
            <ListStore.Provider value={list}>
              <DisplayStore.Provider value={display}>
                {children}
              </DisplayStore.Provider>
            </ListStore.Provider>
          </UserStore.Provider>
        </PopStore.Provider>
      </ThemeProvider>
    );
  };

  it("renders <Display> with mount to test - no view model", () => {
    const wrapper = Render();
    expect(wrapper.find(Display)).toHaveLength(1);
    expect(wrapper.find(NavOperate)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Display> with mount - render snapshot", () => {
    const wrapper = Render(<Display {...props} viewModel={viewModel} />);
    expect(wrapper.find(Display)).toHaveLength(1);
    expect(wrapper.find(DialogOperate)).toHaveLength(1);
    expect(wrapper.find(NavOperate)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Display> with mount - different current", () => {
    const current = { ...viewModel, id: "else-123" };
    const wrapper = Render(<Display {...props} viewModel={current} />);
    expect(wrapper.find(Display)).toHaveLength(1);
    expect(wrapper.find(DialogOperate)).toHaveLength(1);
    expect(wrapper.find(NavOperate)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Display> with mount - simulate close", () => {
    const wrapper = Render();

    act(() => {
      wrapper
        .find(Dialog)
        .props()
        .onClose();
    });

    expect(wrapper.find(Display)).toHaveLength(1);
    expect(wrapper.find(DialogOperate)).toHaveLength(1);
    expect(wrapper.find(NavOperate)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Display> with mount - simulate nav", () => {
    const wrapper = Render();

    act(() => {
      wrapper
        .find(DialogOperate)
        .props()
        .handleNav();
    });

    expect(wrapper.find(Display)).toHaveLength(1);
    expect(wrapper.find(DialogOperate)).toHaveLength(1);
    expect(wrapper.find(NavOperate)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
