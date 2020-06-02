import React from "react";
import { act } from "react-dom/test-utils";
import Select from "@material-ui/core/Select";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { SelectRef } from "components/inputs";
import { ListStore } from "stores/list";
import { MenuStore } from "stores/menu";
import { UserStore } from "stores/user";
import { RefStore } from "stores/ref";
import { Query } from "./Query";
import { mount } from "enzyme";

describe("<Query />", () => {
  const menu = {
    stateMenu: { query: { isOpen: false, logicKey: "meeting" } },
    dispatchMenu: jest.fn(),
  };

  const list = {
    stateList: {
      status: {
        isLoading: false,
        isFailed: false,
      },
      params: { search: "test", authorKeys: [], favouriteRestrict: false },
    },
    dispatchList: jest.fn(),
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

  const ref = {
    stateRef: {
      status: {
        isLoading: false,
        isFailed: false,
      },
      stored: [
        {
          id: "identity-123",
          name: "name",
          logicKey: "user",
          status: {
            isLoading: false,
            isFailed: false,
            isLoaded: true,
          },
          model: { data: [] },
        },
        {
          id: "identity-456",
          name: "name",
          logicKey: "user",
          status: {
            isLoading: false,
            isFailed: false,
            isLoaded: true,
          },
          model: { data: [] },
        },
      ],
    },
    dispatchRef: jest.fn(),
  };

  const tenant = {
    ...user,
    stateUser: { ...user.stateUser, right: { canSuperUser: true } },
  };

  const Render = (children = <Query />, defaultUser = user) => {
    return mount(
      <UserStore.Provider value={defaultUser}>
        <ListStore.Provider value={list}>
          <MenuStore.Provider value={menu}>
            <RefStore.Provider value={ref}>{children}</RefStore.Provider>
          </MenuStore.Provider>
        </ListStore.Provider>
      </UserStore.Provider>
    );
  };

  it("renders <Query> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.find(Query)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Query> with mount - simulate search", () => {
    const wrapper = Render();
    wrapper
      .find("input")
      .first()
      .simulate("change", { target: { value: "search" } });
    expect(list.dispatchList).toHaveBeenCalled();
  });

  it("renders <Query> with mount - simulate favourite", () => {
    const wrapper = Render();
    wrapper
      .find("#favQuery")
      .find("input")
      .simulate("change", { target: { value: true } });
    expect(list.dispatchList).toHaveBeenCalled();
  });

  it("renders <Query> with mount - simulate author", () => {
    const wrapper = Render();
    wrapper.find(Select).simulate("change", { target: { value: "identity-456" } });
    expect(list.dispatchList).toHaveBeenCalled();
  });

  it("renders <Query> with mount - simulate tenant", () => {
    const wrapper = Render(<Query />, tenant);
    wrapper
      .find("#tenantQuery")
      .find("input")
      .simulate("change", { target: { value: true } });
    expect(list.dispatchList).toHaveBeenCalled();
  });

  it("renders <Query> with mount - simulate select author", () => {
    const wrapper = Render();

    act(() => {
      wrapper.find(SelectRef).props().handleChange("identity-123-A");
    });
  });

  it("renders <Query> with mount - simulate submit", () => {
    const wrapper = Render();
    wrapper.find("form").simulate("submit");
    expect(list.dispatchList).toHaveBeenCalled();
  });

  it("renders <Query> with mount - simulate cancel", () => {
    const wrapper = Render();
    wrapper.find("#searchCancel").simulate("click");
    expect(list.dispatchList).toHaveBeenCalled();
  });

  it("renders <Query> with mount - simulate reset", () => {
    const wrapper = Render();
    wrapper.find("#searchReset").first().simulate("click");
    expect(list.dispatchList).toHaveBeenCalled();
  });

  it("renders <Query> with mount - simulate close drawer", () => {
    const wrapper = Render();

    act(() => {
      wrapper.find(SwipeableDrawer).first().props().onClose();
    });
  });

  it("renders <Query> with mount - simulate open drawer", () => {
    const wrapper = Render();

    act(() => {
      wrapper.find(SwipeableDrawer).props().onOpen();
    });
  });
});
