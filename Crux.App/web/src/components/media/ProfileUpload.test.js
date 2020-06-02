import React from "react";
import { act } from "react-dom/test-utils";
import { LoaderStore } from "stores/loader";
import Avatar from "@material-ui/core/Avatar";
import { ProfileUpload } from "./ProfileUpload";
import { ProfileBox } from "./ProfileBox";
import { mount } from "enzyme";

describe("<ProfileUpload />", () => {
  global.URL.createObjectURL = jest.fn().mockReturnValue("src");

  const props = {
    handleChange: jest.fn(),
    handleFile: jest.fn()
  };

  const loader = {
    stateLoader: { files: [], status: { isLoading: false, isFailed: false } },
    dispatchLoader: jest.fn()
  };

  const value = {
    ...loader,
    stateLoader: {
      files: [{ isLoaded: true, isLoading: false, name: "test.png" }],
      status: { isLoading: false, isFailed: false, isLoaded: true }
    }
  };

  const Render = (
    children = <ProfileUpload {...props} />,
    defaultLoader = loader
  ) => {
    return mount(
      <LoaderStore.Provider value={defaultLoader}>
        {children}
      </LoaderStore.Provider>
    );
  };

  it("renders <ProfileUpload> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Avatar)).toHaveLength(0);
  });

  it("renders <ProfileUpload> with mount - effect isRefresh", () => {
    Render(<ProfileUpload {...props} />, value);
    expect(props.handleChange).toHaveBeenCalled();
    expect(loader.dispatchLoader).toHaveBeenCalled();
  });

  it("renders <ProfileUpload> with mount - simulate drop", () => {
    const wrapper = Render();

    act(() => {
      wrapper
        .find(ProfileBox)
        .props()
        .handleFile({ data: [], name: "file.png" });
    });

    expect(loader.dispatchLoader).toHaveBeenCalled();
  });
});
