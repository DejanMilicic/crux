import React from "react";
import { act } from "react-dom/test-utils";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Dialog from "@material-ui/core/Dialog";
import { DialogOperate } from "components/operates";
import { UserStore } from "stores/user";
import { ModelStore } from "stores/model";
import { RefStore } from "stores/ref";
import { PopStore } from "stores/pop";
import { Modal } from "./Modal";
import { mount } from "enzyme";

describe("<Modal />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const props = {
    logicId: "meeting-123-A",
    logicKey: "meeting",
    dispatch: jest.fn(),
    callback: jest.fn()
  };

  const propsAdd = {
    logicId: "",
    logicKey: "meeting",
    dispatch: jest.fn(),
    callback: jest.fn()
  };

  const model = {
    stateModel: {
      status: {
        isLoading: false,
        isFailed: false,
        isLoaded: true
      },
      stored: [{ logicId: "meeting-123-A", logicKey: "meeting" }]
    },
    dispatchModel: jest.fn()
  };

  const edit = {
    stateModel: {
      status: {
        isLoading: false,
        isFailed: false,
        isLoaded: true
      },
      stored: [{ logicId: "else-123-A", logicKey: "meeting" }]
    },
    dispatchModel: jest.fn()
  };

  const saved = {
    stateModel: {
      status: {
        isLoading: false,
        isFailed: false,
        isLoaded: true
      },
      stored: [
        { logicId: "meeting-123-A", logicKey: "meeting", hasSaved: true }
      ]
    },
    dispatchModel: jest.fn()
  };

  const ref = {
    stateRef: {
      status: {
        isLoading: false,
        isFailed: false
      },
      stored: [{ id: "identity-123", name: "name" }]
    },
    dispatchRef: jest.fn()
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

  const Render = (children = <Modal {...props} />, defaultModel = model) => {
    return mount(
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <PopStore.Provider value={pop}>
            <UserStore.Provider value={user}>
              <ModelStore.Provider value={defaultModel}>
                <RefStore.Provider value={ref}>{children}</RefStore.Provider>
              </ModelStore.Provider>
            </UserStore.Provider>
          </PopStore.Provider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    );
  };

  it("renders <Modal> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.find(Modal)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Modal> with mount - simulate effect edit", () => {
    const wrapper = Render(<Modal {...props} />, edit);
    expect(wrapper.find(Modal)).toHaveLength(1);
    expect(edit.dispatchModel).toHaveBeenCalled();
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Modal> with mount - simulate effect edit", () => {
    const wrapper = Render(<Modal {...props} />, edit);
    expect(wrapper.find(Modal)).toHaveLength(1);
    expect(edit.dispatchModel).toHaveBeenCalled();
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Modal> with mount - simulate effect reset", () => {
    const wrapper = Render(<Modal {...propsAdd} />, edit);
    expect(wrapper.find(Modal)).toHaveLength(1);
    expect(edit.dispatchModel).toHaveBeenCalled();
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Modal> with mount - simulate effect saved", () => {
    const wrapper = Render(<Modal {...props} />, saved);
    expect(wrapper.find(Modal)).toHaveLength(1);
    expect(saved.dispatchModel).toHaveBeenCalled();
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Modal> with mount - simulate close", () => {
    const wrapper = Render();

    act(() => {
      wrapper
        .find(Dialog)
        .props()
        .onClose();
    });

    expect(props.callback).toHaveBeenCalled();
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
