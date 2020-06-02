import React from "react";
import Icon from "@material-ui/core/Icon";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fab from "@material-ui/core/Fab";
import { Preview } from "./Preview";
import { mount } from "enzyme";

describe("<Preview />", () => {
  const props = {
    src: "src",
    file: { name: "FileName.png" },
    handleFile: jest.fn(),
    handleView: jest.fn()
  };

  it("renders <Preview> with mount - render snapshot", () => {
    const wrapper = mount(<Preview {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Icon)).toHaveLength(1);
  });

  it("renders <Preview> with mount - render inProgress", () => {
    const wrapper = mount(<Preview {...props} inProgress />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(CircularProgress)).toHaveLength(1);
  });

  it("renders <Preview> with mount - render isComplete", () => {
    const wrapper = mount(<Preview {...props} isComplete />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Icon)).toHaveLength(1);
  });

  it("renders <Preview> with mount - simulate click", () => {
    const wrapper = mount(<Preview {...props} />);
    wrapper.find(Fab).simulate("click");
    expect(props.handleView).not.toHaveBeenCalled();
    expect(props.handleFile).toHaveBeenCalled();
  });

  it("renders <Preview> with mount - simulate click isComplete", () => {
    const wrapper = mount(<Preview {...props} isComplete />);
    wrapper.find(Fab).simulate("click");
    expect(props.handleView).toHaveBeenCalled();
  });
});
