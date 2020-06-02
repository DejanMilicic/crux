import React from "react";
import { EmailCell } from "./EmailCell";
import { mount } from "enzyme";

describe("<EmailCell />", () => {
  const Render = (children = <EmailCell>dave@test.com</EmailCell>) => {
    return mount(
      <table>
        <tbody>
          <tr>{children}</tr>
        </tbody>
      </table>
    );
  };

  it("renders <EmailCell> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(EmailCell)).toHaveLength(1);
  });
});
