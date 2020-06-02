import React from "react";
import { OperateCell } from "./OperateCell";
import { mount } from "enzyme";

describe("<OperateCell />", () => {
  const props = {
    id: "meetings-1",
    logicId: "meetings-1",
    logicKey: "meeting",
    canAdd: true,
    canEdit: true,
    canDelete: true,
    canList: true,
    canCustom: true,
    canFavourite: true,
    favourite: true,
    showInfo: true
  };

  const Render = (children = <OperateCell {...props}>Dave</OperateCell>) => {
    return mount(
      <table>
        <tbody>
          <tr>{children}</tr>
        </tbody>
      </table>
    );
  };

  it("renders <OperateCell> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(OperateCell)).toHaveLength(1);
  });
});
