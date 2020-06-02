import React from "react";
import { ListStore } from "stores/list";
import { MenuStore } from "stores/menu";
import { FilterTable } from "./FilterTable";
import { mount } from "enzyme";

describe("<FilterTable />", () => {
  const props = { logicKey: "meeting" };

  const menu = {
    stateMenu: { query: { isOpen: false } },
    dispatchMenu: jest.fn()
  };

  const list = {
    stateList: {
      status: {
        isLoading: false,
        isFailed: false,
        isLoaded: true
      },
      params: {
        search: "test",
        authorKeys: [],
        favouriteRestrict: false,
        take: 0,
        skip: 0
      },
      list: {
        data: [
          {
            id: "identity-123",
            name: "A Meeting",
            when: "2019-01-01",
            participants: []
          }
        ],
        paging: { total: 10 }
      },
      logicKey: "meeting"
    },
    dispatchList: jest.fn()
  };

  const Render = (children = <FilterTable {...props} />) => {
    return mount(
      <ListStore.Provider value={list}>
        <MenuStore.Provider value={menu}>{children}</MenuStore.Provider>
      </ListStore.Provider>
    );
  };

  it("renders <FilterTable> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.find(FilterTable)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
