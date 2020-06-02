import React from "react";
import { UserStore } from "stores/user";
import { DisplayStore } from "stores/display";
import { ListStore } from "stores/list";
import { PopStore } from "stores/pop";
import Grid from "@material-ui/core/Grid";
import { CanvasOperate } from "./CanvasOperate";
import { mount } from "enzyme";

describe("<CanvasOperate />", () => {
  const props = {
    logicKey: "meeting",
    model: {
      id: "meetings-1",
      canAdd: true,
      canEdit: true,
      canDelete: true,
      canList: true,
      canCustom: true,
      canFavourite: true,
      favourite: true,
    },
    showAdd: true,
    showEdit: true,
    showDelete: true,
    showList: true,
    showCustom: true,
    showFav: true,
    source: "display",
  };

  const user = {
    stateUser: {
      status: { isLoading: false, isFailed: false },
      config: { templateView: "wall" },
    },
    dispatchUser: jest.fn(),
  };

  const pop = { dispatchPop: jest.fn() };
  const display = { dispatchDisplay: jest.fn() };
  const list = { dispatchList: jest.fn() };

  const Render = (children = <CanvasOperate {...props} />) => {
    return mount(
      <PopStore.Provider value={pop}>
        <ListStore.Provider value={list}>
          <DisplayStore.Provider value={display}>
            <UserStore.Provider value={user}>{children}</UserStore.Provider>
          </DisplayStore.Provider>
        </ListStore.Provider>
      </PopStore.Provider>
    );
  };

  it("renders <CanvasOperate> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Grid)).toHaveLength(6);
  });
});
