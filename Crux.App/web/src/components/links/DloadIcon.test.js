import React from "react";
import { DloadIcon } from "./DloadIcon";
import { mount } from "enzyme";

describe("<DloadIcon />", () => {
  const props = {
    aria: "aria-label",
    src: "https://someurl"
  };

  it("renders <DloadIcon> with mount - render snapshot", () => {
    const wrapper = mount(<DloadIcon {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("button")).toHaveLength(0);
    expect(wrapper.find("a")).toHaveLength(1);
  });
});
