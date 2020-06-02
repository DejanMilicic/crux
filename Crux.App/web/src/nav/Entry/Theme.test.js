import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { Theme } from "./Theme";
import { mount } from "enzyme";

describe("<Theme />", () => {
  it("renders <Theme> with mount - render snapshot", () => {
    const wrapper = mount(<Theme>Content</Theme>);
    expect(wrapper.find(ThemeProvider)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
