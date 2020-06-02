import React from "react";
import { act } from "react-dom/test-utils";
import { Delete } from "./Delete";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { DisplayStore } from "stores/display";
import { DeleteStore } from "stores/delete";
import { mount } from "enzyme";

describe("<Delete />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const props = {
    logicId: "meeting-123-A",
    logicKey: "meeting",
    dispatch: jest.fn(),
    callback: jest.fn()
  };

  const viewModel = {
    id: "test-1234",
    name: "name",
    participants: [],
    when: "2019-12-4"
  };

  const display = {
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

  const empty = {
    stateDisplay: {
      status: {
        isLoading: false,
        isFailed: false
      },
      stored: []
    },
    dispatchDisplay: jest.fn()
  };

  const remove = { dispatchDelete: jest.fn() };

  const Render = (
    children = <Delete {...props} />,
    defaultDisplay = display
  ) => {
    return mount(
      <ThemeProvider theme={theme}>
        <DeleteStore.Provider value={remove}>
          <DisplayStore.Provider value={defaultDisplay}>
            {children}
          </DisplayStore.Provider>
        </DeleteStore.Provider>
      </ThemeProvider>
    );
  };

  it("renders <Delete> with mount - render no view model with display", () => {
    const wrapper = Render();
    expect(wrapper.find(Delete)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Delete> with mount - render with view model directly", () => {
    const wrapper = Render(<Delete {...props} viewModel={viewModel} />);
    expect(wrapper.find(Delete)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Delete> with mount - render snapshot no view model and empty display", () => {
    const wrapper = Render(<Delete {...props} />, empty);
    expect(wrapper.find(Delete)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Delete> with mount - simulate close", () => {
    const wrapper = Render();

    act(() => {
      wrapper
        .find(Dialog)
        .props()
        .onClose();
    });

    expect(wrapper.find(Delete)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
