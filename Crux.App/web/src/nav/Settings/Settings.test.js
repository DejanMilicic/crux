import React from "react";
import { act } from "react-dom/test-utils";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { SettingsMenu } from "./settingsMenu";
import { MenuStore } from "stores/menu";
import { UserStore } from "stores/user";
import { PopStore } from "stores/pop";
import { NavDraw } from "components/links";
import { Settings } from "./Settings";
import { mount } from "enzyme";

describe("<Settings />", () => {
  const pop = {
    statePop: {},
    dispatchPop: jest.fn()
  };

  const menu = {
    stateMenu: { settings: { isOpen: true } },
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
        canAdmin: true,
        canSuperUser: false
      },
      user: { id: "user-123" }
    },
    dispatchUser: jest.fn()
  };

  const open = {
    ...menu,
    stateMenu: { ...menu.stateMenu, burger: { isOpen: true } }
  };

  const Render = (children = <Settings />) => {
    return mount(
      <PopStore.Provider value={pop}>
        <UserStore.Provider value={user}>
          <MenuStore.Provider value={menu}>{children}</MenuStore.Provider>
        </UserStore.Provider>
      </PopStore.Provider>
    );
  };

  it("renders <Settings> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.find(Settings)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Settings> with mount - open menu with click", () => {
    const wrapper = Render();
    wrapper
      .find({ label: "My Details" })
      .find(NavDraw)
      .simulate("click");

    expect(wrapper.find(Settings)).toHaveLength(1);
    expect(wrapper.find(NavDraw)).toHaveLength(2);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Settings> with mount - simulate close drawer", () => {
    const wrapper = Render();

    act(() => {
      wrapper
        .find(SwipeableDrawer)
        .first()
        .props()
        .onClose();
    });

    expect(wrapper.find(Settings)).toHaveLength(1);
    expect(wrapper.find(NavDraw)).toHaveLength(2);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Settings> with mount - simulate open drawer", () => {
    const wrapper = Render();

    act(() => {
      wrapper
        .find(SwipeableDrawer)
        .props()
        .onOpen();
    });

    expect(wrapper.find(Settings)).toHaveLength(1);
    expect(wrapper.find(NavDraw)).toHaveLength(2);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Burger> with mount - simulate open drawer child", () => {
    const wrapper = Render(<Settings />, open);

    act(() => {
      wrapper
        .find(SettingsMenu)
        .parent()
        .props()
        .onClick();
    });

    expect(wrapper.find(Settings)).toHaveLength(1);
    expect(wrapper.find(NavDraw)).toHaveLength(2);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Burger> with mount - simulate keyDown drawer child", () => {
    const wrapper = Render(<Settings />, open);

    act(() => {
      wrapper
        .find(SettingsMenu)
        .parent()
        .props()
        .onKeyDown();
    });

    expect(wrapper.find(Settings)).toHaveLength(1);
    expect(wrapper.find(NavDraw)).toHaveLength(2);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
