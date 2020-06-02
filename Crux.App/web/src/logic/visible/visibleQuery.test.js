import React from "react";
import VisibleQuery from "./visibleQuery";
import { mount } from "enzyme";

describe("<VisibleQuery />", () => {
  const props = {};

  it("renders <VisibleQuery> with mount - render snapshot", () => {
    const wrapper = mount(<VisibleQuery {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(VisibleQuery)).toHaveLength(1);
  });
});
