import React from "react";
import { ListStore } from "stores/list";
import { MenuStore } from "stores/menu";
import { PopStore } from "stores/pop";
import { UserStore } from "stores/user";
import { FilterWall } from "./FilterWall";
import { Brick } from "./brick";
import { mount } from "enzyme";

describe("<FilterWall />", () => {
  const props = { logicKey: "meeting" };

  const menu = {
    stateMenu: { query: { isOpen: false } },
    dispatchMenu: jest.fn(),
  };

  const list = {
    stateList: {
      status: {
        isLoading: false,
        isFailed: false,
        isLoaded: true,
      },
      params: { search: "test", authorKeys: [], favouriteRestrict: false },
      list: {
        data: [{ id: "identity-123", name: "A Meeting", when: "2019-01-01" }],
      },
      logicKey: "meeting",
    },
    dispatchList: jest.fn(),
  };

  const pop = {
    statePop: {},
    dispatchPop: jest.fn(),
  };

  const user = {
    stateUser: {
      status: {
        isLoading: false,
        isFailed: false,
      },
      config: {
        templateView: "list",
      },
      right: {
        canSuperUser: false,
      },
    },
    dispatchUser: jest.fn(),
  };

  const Render = (children = <FilterWall {...props} />) => {
    return mount(
      <UserStore.Provider value={user}>
        <ListStore.Provider value={list}>
          <MenuStore.Provider value={menu}>
            <PopStore.Provider value={pop}>{children}</PopStore.Provider>
          </MenuStore.Provider>
        </ListStore.Provider>
      </UserStore.Provider>
    );
  };

  it("renders <FilterWall> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.find(FilterWall)).toHaveLength(1);
    expect(wrapper.find(Brick)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
