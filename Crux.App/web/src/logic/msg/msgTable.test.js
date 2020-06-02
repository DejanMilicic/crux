import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { PopStore } from "stores/pop";
import { ListStore } from "stores/list";
import MsgTable from "./msgTable";
import { mount } from "enzyme";

describe("<MsgTable />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const props = {
    list: {
      data: [
        {
          id: "identity-123",
          name: "name",
          recipients: [],
          when: "2019-01-01",
          dateCreated: "2019-01-01",
        },
      ],
      paging: { total: 1, intervals: 10 },
    },
    params: { take: 10, skip: 0 },
  };

  const list = {
    stateList: {
      status: {
        isLoading: false,
        isFailed: false,
      },
      params: { search: "", authorKeys: [], favouriteRestrict: false },
      list: {
        data: [],
        paging: { total: 1, intervals: 10 },
      },
    },
    dispatchList: jest.fn(),
  };

  const pop = {
    statePop: { show: false, current: {} },
    dispatchPop: jest.fn(),
  };

  const Render = (children = <MsgTable {...props} />) => {
    return mount(
      <ThemeProvider theme={theme}>
        <ListStore.Provider value={list}>
          <PopStore.Provider value={pop}>{children}</PopStore.Provider>
        </ListStore.Provider>
      </ThemeProvider>
    );
  };

  it("renders <MsgTable> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MsgTable)).toHaveLength(1);
  });
});
