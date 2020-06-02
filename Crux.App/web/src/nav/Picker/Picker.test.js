import React from "react";
import { act } from "react-dom/test-utils";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import { RefStore } from "stores/ref";
import { Picker } from "./Picker";
import { mount } from "enzyme";

describe("<Picker />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const props = {
    logicKey: "meeting",
    dispatch: jest.fn(),
    callback: jest.fn(),
    params: {},
    value: [{ id: "identity-123", name: "name" }],
    immediateHandle: true,
    handleChange: jest.fn(),
    label: "label"
  };

  const ref = {
    stateRef: {
      stored: [
        {
          logicKey: "meeting",
          status: {
            isLoading: false,
            isFailed: false,
            isLoaded: true
          },
          params: { search: "test" },
          model: {
            data: [
              { id: "identity-123", name: "name" },
              { id: "identity-456", name: "other" }
            ]
          }
        }
      ]
    },
    dispatchRef: jest.fn()
  };

  const refUnloaded = {
    stateRef: {
      stored: [
        {
          logicKey: "meeting",
          status: {
            isLoading: false,
            isFailed: false,
            isLoaded: false
          },
          params: { search: "test" },
          model: {
            data: [
              { id: "identity-123", name: "name" },
              { id: "identity-456", name: "other" }
            ]
          }
        }
      ]
    },
    dispatchRef: jest.fn()
  };

  const Render = (children = <Picker {...props} />, defaultRef = ref) => {
    return mount(
      <ThemeProvider theme={theme}>
        <RefStore.Provider value={defaultRef}>{children}</RefStore.Provider>
      </ThemeProvider>
    );
  };

  it("renders <Picker> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.find(Picker)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Picker> with mount - simulate search", () => {
    const wrapper = Render();

    wrapper
      .find("input")
      .first()
      .simulate("change", { target: { value: "search" } });

    expect(ref.dispatchRef).toHaveBeenCalled();
    expect(wrapper.find(Picker)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Picker> with mount - simulate selection", () => {
    const wrapper = Render();

    wrapper
      .find(ListItem)
      .last()
      .simulate("click");

    expect(props.handleChange).toHaveBeenCalled();

    wrapper
      .find(ListItem)
      .first()
      .simulate("click");

    wrapper
      .find(ListItem)
      .last()
      .simulate("click");

    expect(wrapper.find(Picker)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Picker> with mount - simulate favourite", () => {
    const wrapper = Render();
    wrapper.find("#favSearch").simulate("click");
    expect(ref.dispatchRef).toHaveBeenCalled();
    expect(wrapper.find(Picker)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Picker> with mount - simulate submit", () => {
    const wrapper = Render(<Picker {...props} immediateHandle={false} />);
    wrapper.find(Button).simulate("click");
    expect(props.callback).toHaveBeenCalled();
    expect(wrapper.find(Picker)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Picker> with mount - unloaded state", () => {
    const wrapper = Render(<Picker {...props} />, refUnloaded);
    expect(refUnloaded.dispatchRef).toHaveBeenCalled();
    expect(wrapper.find(Picker)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Picker> with mount - simulate close", () => {
    const wrapper = Render();

    act(() => {
      wrapper
        .find(Dialog)
        .props()
        .onClose();
    });

    expect(props.callback).toHaveBeenCalled();
    expect(wrapper.find(Picker)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
