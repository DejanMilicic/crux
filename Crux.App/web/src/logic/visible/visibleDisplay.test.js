import React from "react";
import VisibleDisplay from "./visibleDisplay";
import { mount } from "enzyme";

describe("<VisibleDisplay />", () => {
  const model = {
    id: "identity-123",
    name: "name",
    fullUrl: "https://img.com/image.png"
  };

  const image = {
    ...model,
    isImgae: true
  };

  const video = {
    ...model,
    isVideo: true
  };

  const doc = {
    ...model,
    isDocument: true
  };

  it("renders <VisibleDisplay> with mount - render snapshot", () => {
    const wrapper = mount(<VisibleDisplay model={model} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(VisibleDisplay)).toHaveLength(1);
  });

  it("renders <VisibleDisplay> with mount - render image", () => {
    const wrapper = mount(<VisibleDisplay model={image} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(VisibleDisplay)).toHaveLength(1);
  });

  it("renders <VisibleDisplay> with mount - render video", () => {
    const wrapper = mount(<VisibleDisplay model={video} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(VisibleDisplay)).toHaveLength(1);
  });

  it("renders <VisibleDisplay> with mount - render doc", () => {
    const wrapper = mount(<VisibleDisplay model={doc} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(VisibleDisplay)).toHaveLength(1);
  });

  it("renders <VisibleDisplay> with mount - render image", () => {
    const wrapper = mount(<VisibleDisplay model={image} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(VisibleDisplay)).toHaveLength(1);
  });
});
