import React from "react";
import { act } from "react-dom/test-utils";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { RefStore } from "stores/ref";
import IconButton from "@material-ui/core/IconButton";
import { Selection } from "./Selection";
import { mount } from "enzyme";

describe("<Selection />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const props = {
    logicKey: "meeting",
    dispatch: jest.fn(),
    callback: jest.fn(),
    params: {},
    value: "identity-123",
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
            data: [{ id: "list-123", name: "something" }]
          }
        }
      ]
    },
    dispatchRef: jest.fn()
  };

  const emptyRef = {
    stateRef: {
      stored: []
    },
    dispatchRef: jest.fn()
  };

  const Render = (children = <Selection {...props} />, defaultRef = ref) => {
    return mount(
      <ThemeProvider theme={theme}>
        <RefStore.Provider value={defaultRef}>{children}</RefStore.Provider>
      </ThemeProvider>
    );
  };

  it("renders <Selection> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.find(Selection)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Selection> with mount - simulate search", () => {
    const wrapper = Render();
    wrapper
      .find("input")
      .simulate("change", { target: { value: "search term" } });
    expect(ref.dispatchRef).toHaveBeenCalled();
  });

  it("renders <Selection> with mount - simulate favourite", () => {
    const wrapper = Render();
    wrapper
      .find(IconButton)
      .last()
      .simulate("click");
    expect(ref.dispatchRef).toHaveBeenCalled();
  });

  it("renders <Selection> with mount - simulate close", () => {
    const wrapper = Render();

    act(() => {
      wrapper
        .find(Dialog)
        .props()
        .onClose();
    });
  });

  it("renders <Selection> with mount - render empty", () => {
    Render(<Selection {...props} value="" />, emptyRef);
    expect(emptyRef.dispatchRef).toHaveBeenCalled();
  });
});
