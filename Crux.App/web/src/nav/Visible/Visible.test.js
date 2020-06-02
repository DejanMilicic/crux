import React from "react";
import { act } from "react-dom/test-utils";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { MediaOperate } from "components/operates";
import { PopStore } from "stores/pop";
import { DisplayStore } from "stores/display";
import { ListStore } from "stores/list";
import { UserStore } from "stores/user";
import { ModelStore } from "stores/model";
import { RetainStore } from "stores/retain";
import { Visible } from "./Visible";
import { mount } from "enzyme";

describe("<Visible />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const props = {
    logicId: "visible-123-A",
    logicKey: "visible",
    dispatch: jest.fn(),
    callback: jest.fn()
  };

  const display = {
    stateDisplay: {
      stored: [
        {
          logicKey: "visible",
          current: {
            id: "visible-123-A",
            name: "name",
            fullUrl: "https://img.com/image.png",
            thumbUrl: "https://img.com/image.png"
          }
        }
      ],
      status: { isLoading: false, isFailed: false, isLoaded: true }
    },
    dispatchDisplay: jest.fn()
  };

  const empty = {
    stateDisplay: {
      stored: [],
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

  const retain = {
    stateRetain: {
      show: false,
      stored: []
    },
    dispatchRetain: jest.fn()
  };

  const model = {
    stateModel: {
      status: {
        isLoading: false,
        isFailed: false,
        isLoaded: true
      },
      stored: []
    },
    dispatchModal: jest.fn()
  };

  const viewModel = {
    id: "unique-123",
    name: "animage.png",
    fullUrl: "https://img.com/image.png",
    thumbUrl: "https://img.com/image.png"
  };

  const Render = (
    children = <Visible {...props} />,
    defaultDisplay = display
  ) => {
    return mount(
      <ThemeProvider theme={theme}>
        <PopStore.Provider value={pop}>
          <UserStore.Provider value={user}>
            <ListStore.Provider value={list}>
              <DisplayStore.Provider value={defaultDisplay}>
                <RetainStore.Provider value={retain}>
                  <ModelStore.Provider value={model}>
                    {children}
                  </ModelStore.Provider>
                </RetainStore.Provider>
              </DisplayStore.Provider>
            </ListStore.Provider>
          </UserStore.Provider>
        </PopStore.Provider>
      </ThemeProvider>
    );
  };

  it("renders <Visible> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.find(Visible)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Visible> with mount - render with viewModel", () => {
    const wrapper = Render(<Visible {...props} viewModel={viewModel} />, empty);
    expect(wrapper.find(Visible)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Visible> with mount - render with viewModel - video", () => {
    const wrapper = Render(
      <Visible {...props} viewModel={{ ...viewModel, isVideo: true }} />,
      empty
    );
    expect(wrapper.find(Visible)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Visible> with mount - render with viewModel - doc", () => {
    const wrapper = Render(
      <Visible {...props} viewModel={{ ...viewModel, isDocument: true }} />,
      empty
    );
    expect(wrapper.find(Visible)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Visible> with mount - render with empty", () => {
    const wrapper = Render(<Visible {...props} viewModel={viewModel} />, empty);
    expect(wrapper.find(Visible)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Visible> with mount - simulate close", () => {
    const wrapper = Render();

    act(() => {
      wrapper
        .find(Dialog)
        .props()
        .onClose();
    });

    expect(props.callback).toHaveBeenCalled();
    expect(wrapper.find(Visible)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Visible> with mount - simulate nav", () => {
    const wrapper = Render(<Visible {...props} />);

    act(() => {
      wrapper
        .find(MediaOperate)
        .props()
        .handleNav("id");
    });

    expect(props.callback).toHaveBeenCalled();
    expect(wrapper.find(Visible)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
