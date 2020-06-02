import React from "react";
import { act } from "react-dom/test-utils";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { DialogOperate, NavOperate } from "components/operates";
import { DisplayStore } from "stores/display";
import { ListStore } from "stores/list";
import { LoaderStore } from "stores/loader";
import { UserStore } from "stores/user";
import { PopStore } from "stores/pop";
import { ModalFinish } from "./modalFinish";
import { mount } from "enzyme";

describe("<ModalFinish />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const props = {
    logicId: "meeting-123-A",
    logicKey: "meeting",
    dispatch: jest.fn(),
    callback: jest.fn()
  };

  const list = {
    stateList: {
      status: {
        isLoading: false,
        isFailed: false,
        isLoaded: true
      }
    },
    dispatchList: jest.fn()
  };

  const display = {
    stateDisplay: {
      stored: [],
      status: {
        isLoading: false,
        isFailed: false,
        isLoaded: true
      }
    },
    dispatchDisplay: jest.fn()
  };

  const current = {
    stateDisplay: {
      status: {
        isLoading: false,
        isFailed: false,
        isLoaded: true
      },
      stored: [
        {
          logicKey: "meeting",
          current: {
            id: "meeting-123-A",
            name: "name",
            when: "2019-01-01"
          }
        }
      ]
    },
    dispatchDisplay: jest.fn()
  };

  const loader = {
    stateLoader: {},
    dispatchLoader: jest.fn()
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

  const failed = {
    ...display,
    stateDisplay: {
      stored: [],
      status: {
        isLoading: false,
        isFailed: true,
        isLoaded: false
      }
    }
  };

  const Render = (
    children = <ModalFinish {...props} />,
    defaultDisplay = display
  ) => {
    return mount(
      <ThemeProvider theme={theme}>
        <DisplayStore.Provider value={defaultDisplay}>
          <ListStore.Provider value={list}>
            <LoaderStore.Provider value={loader}>
              <UserStore.Provider value={user}>
                <PopStore.Provider value={pop}>{children}</PopStore.Provider>
              </UserStore.Provider>
            </LoaderStore.Provider>
          </ListStore.Provider>
        </DisplayStore.Provider>
      </ThemeProvider>
    );
  };

  it("renders <ModalFinish> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.find(ModalFinish)).toHaveLength(1);
    expect(wrapper.find(NavOperate)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <ModalFinish> with mount - render failed", () => {
    const wrapper = Render(<ModalFinish {...props} />, failed);
    expect(wrapper.find(ModalFinish)).toHaveLength(1);
    expect(wrapper.find(NavOperate)).toHaveLength(0);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <ModalFinish> with mount - render current", () => {
    const wrapper = Render(<ModalFinish {...props} />, current);
    expect(wrapper.find(ModalFinish)).toHaveLength(1);
    expect(wrapper.find(NavOperate)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <ModalFinish> with mount - simulate close", () => {
    const wrapper = Render();

    act(() => {
      wrapper
        .find(Dialog)
        .props()
        .onClose();
    });

    expect(wrapper.find(ModalFinish)).toHaveLength(1);
    expect(wrapper.find(NavOperate)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
