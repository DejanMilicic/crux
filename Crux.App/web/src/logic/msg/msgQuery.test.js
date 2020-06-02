import React from "react";
import { ListStore } from "stores/list";
import { RefStore } from "stores/ref";
import MsgQuery from "./MsgQuery";
import { mount } from "enzyme";

describe("<MsgQuery />", () => {
  const props = {};

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

  const ref = {
    stateRef: {
      status: {
        isLoading: false,
        isFailed: false,
        isLoaded: true,
      },
      stored: [
        {
          id: "identity-123",
          name: "name",
          logicKey: "user",
          model: {
            data: [],
          },
          status: {
            isLoading: false,
            isFailed: false,
            isLoaded: true,
          },
        },
      ],
    },
    dispatchRef: jest.fn(),
  };

  const Render = (children = <MsgQuery {...props} />) => {
    return mount(
      <RefStore.Provider value={ref}>
        <ListStore.Provider value={list}>{children}</ListStore.Provider>
      </RefStore.Provider>
    );
  };

  it("renders <MsgQuery> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MsgQuery)).toHaveLength(1);
  });

  it("renders <MsgQuery> with mount - simulate change", () => {
    const wrapper = Render();
    wrapper.find("#recipientSelect").first().props().handleChange("newKey");

    expect(list.dispatchList).toHaveBeenCalled();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MsgQuery)).toHaveLength(1);
  });
});
