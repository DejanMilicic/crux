import React from "react";
import { act } from "react-dom/test-utils";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { UserStore } from "stores/user";
import { MenuStore } from "stores/menu";
import { ListStore } from "stores/list";
import { mount } from "enzyme";
import { NavDraw } from "components/links";
import { Burger } from "./Burger";
import { MainMenu } from "./mainMenu";

describe("<Burger />", () => {
  const user = {
    stateUser: {
      status: { isLoading: false, isFailed: false },
      config: { templateView: "wall" },
      right: { canAdmin: true, canSuperuser: true },
    },
    dispatchUser: jest.fn(),
  };

  const menu = {
    stateMenu: {
      burger: { isOpen: false },
      settings: { isOpen: false },
      query: { isOpen: false },
    },
    dispatchMenu: jest.fn(),
  };

  const list = {
    stateList: {
      status: { isLoading: false, isFailed: false },
    },
    dispatchList: jest.fn(),
  };

  const open = {
    ...menu,
    stateMenu: { ...menu.stateMenu, burger: { isOpen: true } },
  };

  const Render = (children = <Burger />, defaultMenu = menu) => {
    return mount(
      <ListStore.Provider value={list}>
        <UserStore.Provider value={user}>
          <MenuStore.Provider value={defaultMenu}>{children}</MenuStore.Provider>
        </UserStore.Provider>
      </ListStore.Provider>
    );
  };

  it("renders <Burger> with mount - render snapshot", () => {
    const wrapper = Render(<Burger />, open);
    expect(wrapper.find(SwipeableDrawer)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Burger> with mount - simulate click", () => {
    const wrapper = Render(<Burger />, open);
    wrapper.find("#media").first().simulate("click");

    expect(list.dispatchList).toHaveBeenCalled();
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Burger> with mount - simulate close drawer parent", () => {
    const wrapper = Render(<Burger />, open);

    act(() => {
      wrapper.find(SwipeableDrawer).props().onClose();
    });

    expect(wrapper.find(Burger)).toHaveLength(1);
    expect(wrapper.find(NavDraw)).toHaveLength(6);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Burger> with mount - simulate close drawer child", () => {
    const wrapper = Render(<Burger />, open);

    act(() => {
      wrapper.find(SwipeableDrawer).first().props().onClose();
    });

    expect(wrapper.find(Burger)).toHaveLength(1);
    expect(wrapper.find(NavDraw)).toHaveLength(6);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Burger> with mount - simulate open drawer parent", () => {
    const wrapper = Render();

    act(() => {
      wrapper.find(SwipeableDrawer).props().onOpen();
    });

    expect(wrapper.find(Burger)).toHaveLength(1);
    expect(wrapper.find(NavDraw)).toHaveLength(0);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Burger> with mount - simulate open drawer child", () => {
    const wrapper = Render(<Burger />, open);

    act(() => {
      wrapper.find(MainMenu).parent().props().onClick();
    });

    expect(wrapper.find(Burger)).toHaveLength(1);
    expect(wrapper.find(NavDraw)).toHaveLength(6);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Burger> with mount - simulate keyDown drawer child", () => {
    const wrapper = Render(<Burger />, open);

    act(() => {
      wrapper.find(MainMenu).parent().props().onKeyDown();
    });

    expect(wrapper.find(Burger)).toHaveLength(1);
    expect(wrapper.find(NavDraw)).toHaveLength(6);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
