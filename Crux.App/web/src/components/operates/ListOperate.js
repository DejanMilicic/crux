import React, { Suspense, lazy, Fragment } from "react";
import PropTypes from "prop-types";
import { NullLoader } from "nav";
import { NavIcon } from "components/links";

export function ListOperate({ logicKey, showInfo, showEdit, showDelete, showCustom, model, children }) {
  const OperateComponent = lazy(() => import("logic/" + logicKey + "/" + logicKey + "Operate"));

  return (
    <Fragment>
      {showInfo ? (
        <NavIcon to={"/display/" + logicKey + "/" + model.id} replace="true">
          info
        </NavIcon>
      ) : null}
      {model.canEdit && showEdit ? <NavIcon to={"/edit/" + logicKey + "/" + model.id}>edit</NavIcon> : null}
      {model.canDelete && showDelete ? <NavIcon to={"/delete/" + logicKey + "/" + model.id}>delete</NavIcon> : null}
      {model.canCustom && showCustom ? (
        <Suspense fallback={<NullLoader />}>
          <OperateComponent model={model} logicKey={logicKey} />
        </Suspense>
      ) : null}
      {children}
    </Fragment>
  );
}

ListOperate.propTypes = {
  logicKey: PropTypes.string.isRequired,
  showInfo: PropTypes.bool,
  showEdit: PropTypes.bool,
  showDelete: PropTypes.bool,
  showCustom: PropTypes.bool,
  model: PropTypes.shape({
    id: PropTypes.string,
    canEdit: PropTypes.bool,
    canDelete: PropTypes.bool,
    canList: PropTypes.bool,
    canCustom: PropTypes.bool,
    canFavourite: PropTypes.bool,
    favourite: PropTypes.bool,
  }),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
