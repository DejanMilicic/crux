import React from "react";
import { act } from "react-dom/test-utils";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { DisplayStore } from "stores/display";
import { UserStore } from "stores/user";
import { ListStore } from "stores/list";
import { PopStore } from "stores/pop";
import { LoaderStore } from "stores/loader";
import { mount } from "enzyme";
import { CloseIcon } from "components/links";
import { DeleteFinish } from "./DeleteFinish";

describe("<DeleteFinish />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const props = {
    logicKey: "meeting",
    dispatch: jest.fn(),
    callback: jest.fn(),
  };

  const loader = {
    stateLoader: {
      status: { isLoading: false, isFailed: false },
    },
    dispatchLoader: jest.fn(),
  };

  const list = {
    stateList: {
      status: { isLoading: false, isFailed: false },
      paging: { loadable: true },
    },
    dispatchList: jest.fn(),
  };

  const user = {
    stateUser: {
      status: { isLoading: false, isFailed: false },
      config: { templateView: "list" },
    },
    dispatchUser: jest.fn(),
  };

  const display = { dispatchDisplay: jest.fn() };
  const pop = { dispatchPop: jest.fn() };

  const Render = (children = <DeleteFinish {...props} />) => {
    return mount(
      <ThemeProvider theme={theme}>
        <LoaderStore.Provider value={loader}>
          <PopStore.Provider value={pop}>
            <UserStore.Provider value={user}>
              <ListStore.Provider value={list}>
                <DisplayStore.Provider value={display}>{children}</DisplayStore.Provider>
              </ListStore.Provider>
            </UserStore.Provider>
          </PopStore.Provider>
        </LoaderStore.Provider>
      </ThemeProvider>
    );
  };

  it("renders <DeleteFinish> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.find(DeleteFinish)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <DeleteFinish> with mount - handleClose", () => {
    const wrapper = Render();
    expect(wrapper.find(DeleteFinish)).toHaveLength(1);
    const close = wrapper.find(CloseIcon);
    expect(close).toHaveLength(1);
    close.simulate("click");
    expect(props.callback).toBeCalled();
  });

  it("renders <DeleteFinish> with mount - simulate close", () => {
    const wrapper = Render();

    act(() => {
      wrapper.find(Dialog).props().onClose();
    });

    expect(wrapper.find(DeleteFinish)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
