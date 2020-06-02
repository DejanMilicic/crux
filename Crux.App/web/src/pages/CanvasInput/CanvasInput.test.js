import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { ModelStore } from "stores/model";
import { RefStore } from "stores/ref";
import { PopStore } from "stores/pop";
import { CanvasInput } from "./CanvasInput";
import { mount } from "enzyme";

describe("<CanvasInput />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const props = {
    logicId: "meeting-123-A",
    logicKey: "meeting"
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
    dispatchModal: jest.fn()
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
      stored: [
        {
          logicKey: "meeting",
          status: {
            isLoading: false,
            isFailed: false
          },
          params: { search: "test" }
        }
      ]
    },
    dispatchRef: jest.fn()
  };

  const pop = {
    statePop: {},
    dispatchPop: jest.fn()
  };

  const Render = (
    children = <CanvasInput {...props} />,
    defaultModel = model
  ) => {
    return mount(
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <ModelStore.Provider value={defaultModel}>
            <RefStore.Provider value={ref}>
              <PopStore.Provider value={pop}>{children}</PopStore.Provider>
            </RefStore.Provider>
          </ModelStore.Provider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    );
  };

  it("renders <CanvasInput> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.find(CanvasInput)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <CanvasInput> with mount - simulate effect edit", () => {
    const wrapper = Render(<CanvasInput {...props} />, edit);
    expect(wrapper.find(CanvasInput)).toHaveLength(1);
    expect(edit.dispatchModel).toHaveBeenCalled();
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <CanvasInput> with mount - simulate effect reset", () => {
    const wrapper = Render(<CanvasInput {...propsAdd} />, edit);
    expect(wrapper.find(CanvasInput)).toHaveLength(1);
    expect(edit.dispatchModel).toHaveBeenCalled();
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <CanvasInput> with mount - simulate effect saved", () => {
    const wrapper = Render(<CanvasInput {...props} />, saved);
    expect(wrapper.find(CanvasInput)).toHaveLength(1);
    expect(saved.dispatchModel).toHaveBeenCalled();
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
