import React, { useContext, Fragment } from "react";
import PropTypes from "prop-types";
import { ClickIcon } from "components/links";
import { selectList, ListStore } from "stores/list";

export function NavOperate({ logicId, logicKey, hasNav, handleNav, children }) {
  const { list, statusList } = selectList(logicKey, useContext(ListStore));

  let navVisible = false;
  let backDisabled = true;
  let forwardDisabled = true;

  if (statusList.isCurrent) {
    const model = list.data.find(e => e.id === logicId);

    if (model) {
      navVisible = hasNav;
      const index = list.data.indexOf(model);

      if (index > 0) {
        backDisabled = false;
      }

      if (index < list.data.length - 1) {
        forwardDisabled = false;
      }
    }
  }

  function handleBack() {
    const model = list.data.find(e => e.id === logicId);
    const index = list.data.indexOf(model);
    handleNav(list.data[index - 1].id);
  }

  function handleForward() {
    const model = list.data.find(e => e.id === logicId);
    const index = list.data.indexOf(model);
    handleNav(list.data[index + 1].id);
  }

  return (
    <Fragment>
      {navVisible ? (
        <ClickIcon
          id="back"
          callback={handleBack}
          logicKey={logicKey}
          disabled={backDisabled}
          aria="back"
        >
          arrow_left
        </ClickIcon>
      ) : null}
      {children}
      {navVisible ? (
        <ClickIcon
          id="forward"
          callback={handleForward}
          logicKey={logicKey}
          disabled={forwardDisabled}
          aria="forward"
        >
          arrow_right
        </ClickIcon>
      ) : null}
    </Fragment>
  );
}

NavOperate.propTypes = {
  logicId: PropTypes.string,
  logicKey: PropTypes.string.isRequired,
  hasNav: PropTypes.bool.isRequired,
  handleNav: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
