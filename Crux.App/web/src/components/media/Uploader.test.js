import React from "react";
import { LoaderStore } from "stores/loader";
import Avatar from "@material-ui/core/Avatar";
import { DropBox } from "./DropBox";
import { Preview } from "./Preview";
import { Uploader } from "./Uploader";
import { mount } from "enzyme";

describe("<Uploader />", () => {
  global.URL.createObjectURL = jest.fn().mockReturnValue("src");

  const props = {
    handleChange: jest.fn()
  };

  const loader = {
    stateLoader: {
      files: [
        {
          isLoaded: true,
          isLoading: false,
          name: "test.png",
          file: { data: "xyz" }
        }
      ],
      status: { isLoading: false, isFailed: false }
    },
    dispatchLoader: jest.fn()
  };

  const Render = (children = <Uploader {...props} />) => {
    return mount(
      <LoaderStore.Provider value={loader}>{children}</LoaderStore.Provider>
    );
  };

  it("renders <Uploader> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Avatar)).toHaveLength(0);
  });

  it("renders <Uploader> with mount - render with file", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Avatar)).toHaveLength(0);
  });

  it("renders <Uploader> with mount - simulate click on single", () => {
    const wrapper = Render();
    wrapper
      .find(Preview)
      .props()
      .handleFile({ data: "xyz" });
    expect(props.handleChange).toHaveBeenCalled();
    expect(loader.dispatchLoader).toHaveBeenCalled();
  });

  it("renders <Uploader> with mount - simulate click on all", () => {
    const wrapper = Render();
    wrapper
      .find("#uploadAll")
      .first()
      .simulate("click");
    expect(props.handleChange).toHaveBeenCalled();
  });

  it("renders <Uploader> with mount - simulate drop", () => {
    const wrapper = Render();
    wrapper
      .find(DropBox)
      .props()
      .handleFiles([{ data: "xyz" }]);
    expect(loader.dispatchLoader).toHaveBeenCalled();
  });
});
