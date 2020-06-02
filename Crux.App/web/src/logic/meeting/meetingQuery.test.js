import React from "react";
import { ListStore } from "stores/list";
import { RefStore } from "stores/ref";
import MeetingQuery from "./meetingQuery";
import { mount } from "enzyme";

describe("<MeetingQuery />", () => {
  const props = {};

  const list = {
    stateList: {
      status: {
        isLoading: false,
        isFailed: false
      },
      params: { search: "test", authorKeys: [], favouriteRestrict: false }
    },
    dispatchList: jest.fn()
  };

  const ref = {
    stateRef: {
      status: {
        isLoading: false,
        isFailed: false,
        isLoaded: true
      },
      stored: [
        {
          id: "identity-123",
          name: "name",
          logicKey: "user",
          model: {
            data: []
          },
          status: {
            isLoading: false,
            isFailed: false,
            isLoaded: true
          }
        }
      ]
    },
    dispatchRef: jest.fn()
  };

  const Render = (children = <MeetingQuery {...props} />) => {
    return mount(
      <RefStore.Provider value={ref}>
        <ListStore.Provider value={list}>{children}</ListStore.Provider>
      </RefStore.Provider>
    );
  };

  it("renders <MeetingQuery> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MeetingQuery)).toHaveLength(1);
  });

  it("renders <MeetingQuery> with mount - simulate change", () => {
    const wrapper = Render();
    wrapper
      .find("#participantSelect")
      .first()
      .props()
      .handleChange("newKey");

    expect(list.dispatchList).toHaveBeenCalled();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MeetingQuery)).toHaveLength(1);
  });
});
