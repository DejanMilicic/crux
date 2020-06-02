import React from "react";
import Icon from "@material-ui/core/Icon";
import { CheckCell } from "./CheckCell";
import { mount } from "enzyme";

describe("<CheckCell />", () => {
  const Render = (children = <CheckCell />) => {
    return mount(
      <table>
        <tbody>
          <tr>{children}</tr>
        </tbody>
      </table>
    );
  };

  it("renders <CheckCell> with mount - render without", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Icon)).toHaveLength(1);
  });

  it("renders <CheckCell> with mount - render with Value", () => {
    const wrapper = Render(<CheckCell value />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Icon)).toHaveLength(1);
  });
});
