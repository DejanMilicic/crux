import React from "react";
import { MenuStore } from "stores/menu";
import { UserStore } from "stores/user";
import { ListStore } from "stores/list";
import { RefStore } from "stores/ref";
import { TopBar } from "./TopBar";
import { mount } from "enzyme";

describe("<TopBar />", () => {
  const menu = {
    stateMenu: {
      settings: { isOpen: false },
      query: { isOpen: false },
      burger: { isOpen: false }
    },
    dispatchMenu: jest.fn()
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

  const list = {
    stateList: {
      status: {
        isLoading: false,
        isFailed: false,
        isLoaded: true
      },
      params: { search: "test", authorKeys: [], favouriteRestrict: false }
    },
    dispatchList: jest.fn()
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

  const Render = (children = <TopBar />) => {
    return mount(
      <RefStore.Provider value={ref}>
        <ListStore.Provider value={list}>
          <UserStore.Provider value={user}>
            <MenuStore.Provider value={menu}>{children}</MenuStore.Provider>
          </UserStore.Provider>
        </ListStore.Provider>
      </RefStore.Provider>
    );
  };

  it("renders <TopBar> with mount to test", () => {
    const wrapper = Render();
    expect(wrapper.find(TopBar)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
