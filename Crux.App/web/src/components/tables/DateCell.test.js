import React from "react";
import { DateCell } from "./DateCell";
import { mount } from "enzyme";

describe("<DateCell />", () => {
  const Render = (children = <DateCell date="01/12/2018" />) => {
    return mount(
      <table>
        <tbody>
          <tr>{children}</tr>
        </tbody>
      </table>
    );
  };

  it("renders <DateCell> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(DateCell)).toHaveLength(1);
  });
});
