import React from "react";
import { act } from "react-dom/test-utils";
import { Uploader } from "components/media";
import { ListStore } from "stores/list";
import { MenuStore } from "stores/menu";
import { LoaderStore } from "stores/loader";
import { PopStore } from "stores/pop";
import { MediaWall } from "./MediaWall";
import { mount } from "enzyme";

describe("<MediaWall />", () => {
  global.URL.createObjectURL = jest.fn().mockReturnValue("src");

  const props = {};

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
      params: { search: "test", authorKeys: [], favouriteRestrict: false },
      list: {
        data: [
          {
            id: "identity-123",
            name: "file.png",
            thumbUrl: "https://img.com/image.png",
            file: {},
            isLoading: false,
            isFailed: false,
            isLoaded: true
          }
        ]
      }
    },
    dispatchList: jest.fn()
  };

  const loader = {
    stateLoader: {
      status: {
        isLoading: false,
        isFailed: false,
        isLoaded: true
      },
      files: [
        {
          id: "identity-123",
          name: "file.png",
          thumbUrl: "https://img.com/image.png",
          file: {},
          isLoading: false,
          isFailed: false,
          isLoaded: true
        }
      ]
    },
    dispatchLoader: jest.fn()
  };

  const pop = {
    statePop: {},
    dispatchPop: jest.fn()
  };

  const Render = (children = <MediaWall {...props} />) => {
    return mount(
      <ListStore.Provider value={list}>
        <MenuStore.Provider value={menu}>
          <LoaderStore.Provider value={loader}>
            <PopStore.Provider value={pop}>{children}</PopStore.Provider>
          </LoaderStore.Provider>
        </MenuStore.Provider>
      </ListStore.Provider>
    );
  };

  it("renders <MediaWall> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.find(MediaWall)).toHaveLength(1);
    expect(wrapper.find(Uploader)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <MediaWall> with mount - simulate uploader change", () => {
    const wrapper = Render();

    act(() => {
      wrapper
        .find(Uploader)
        .props()
        .handleChange();
    });

    expect(wrapper.find(MediaWall)).toHaveLength(1);
    expect(wrapper.find(Uploader)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
