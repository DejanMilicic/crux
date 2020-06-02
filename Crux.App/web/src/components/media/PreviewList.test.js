import React from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { PreviewList } from "./PreviewList";
import { mount } from "enzyme";

describe("<PreviewList />", () => {
  global.URL.createObjectURL = jest.fn().mockReturnValue("src");

  const props = {
    handleFile: jest.fn()
  };

  const file = {
    file: {},
    name: "file.jpg",
    isLoaded: false,
    isLoading: false
  };

  it("renders <PreviewList> with mount - render snapshot", () => {
    const wrapper = mount(<PreviewList {...props} files={[]} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Box)).toHaveLength(1);
  });

  it("renders <PreviewList> with mount - render with file", () => {
    const wrapper = mount(<PreviewList {...props} files={[file]} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Paper)).toHaveLength(1);
  });
});
