import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { DisplayStore } from "stores/display";
import { DeleteStore } from "stores/delete";
import { CanvasDelete } from "./CanvasDelete";
import { mount } from "enzyme";

describe("<CanvasDelete />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const props = {
    logicId: "meeting-123-A",
    logicKey: "meeting"
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
          logicId: "meeting-123-A",
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
        isFailed: false,
        isLoaded: true
      },
      stored: []
    },
    dispatchDisplay: jest.fn()
  };

  const remove = {
    dispatchDelete: jest.fn()
  };

  const Render = (
    children = <CanvasDelete {...props} />,
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

  it("renders <CanvasDelete> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.find(CanvasDelete)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <CanvasDelete> with mount - render snapshot with empty", () => {
    const wrapper = Render(<CanvasDelete {...props} />, empty);
    expect(wrapper.find(CanvasDelete)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <CanvasDelete> with mount - simulate yes", () => {
    const wrapper = Render();

    wrapper
      .find("#yes")
      .first()
      .simulate("click");

    expect(remove.dispatchDelete).toHaveBeenCalled();
    expect(wrapper.find(CanvasDelete)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <CanvasDelete> with mount - simulate no", () => {
    const wrapper = Render();

    wrapper
      .find("#no")
      .first()
      .simulate("click");

    expect(remove.dispatchDelete).toHaveBeenCalled();
    expect(wrapper.find(CanvasDelete)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
