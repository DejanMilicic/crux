import React from "react";
import { LoaderStore } from "stores/loader";
import Avatar from "@material-ui/core/Avatar";
import { ProfileInput } from "./ProfileInput";
import { mount } from "enzyme";

describe("<ProfileInput />", () => {
  const props = {
    id: "data-1",
    name: "A label",
    profileId: "image-1",
    profileThumbUrl: "https://www.aurl.com/image.png",
    handleChange: jest.fn(),
    handleLibrary: jest.fn()
  };

  const loader = {
    stateLoader: { status: { isLoading: false, isFailed: false } },
    dispatchLoader: jest.fn()
  };

  const Render = (children = <ProfileInput {...props} />) => {
    return mount(
      <LoaderStore.Provider value={loader}>{children}</LoaderStore.Provider>
    );
  };

  it("renders <ProfileInput> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Avatar)).toHaveLength(1);
  });
});
