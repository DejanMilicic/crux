import React, { Suspense, lazy } from "react";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import { NullLoader } from "nav";
import { FavMenu, MenuIcon, NavMenu, DisplayMenu } from "components/links";

export function MenuOperate({ logicKey, showInfo, showCustom, showFav, model, children }) {
  const OperateComponent = lazy(() => import("logic/" + logicKey + "/" + logicKey + "Menu"));

  return (
    <MenuIcon id={model.id}>
      {showInfo ? (
        <DisplayMenu logicId={model.id} logicKey={logicKey} icon="info">
          Info
        </DisplayMenu>
      ) : null}
      {model.canEdit ? (
        <NavMenu to={"/edit/" + logicKey + "/" + model.id} icon="edit">
          Edit
        </NavMenu>
      ) : null}
      {model.canDelete ? (
        <NavMenu to={"/delete/" + logicKey + "/" + model.id} icon="delete">
          Delete
        </NavMenu>
      ) : null}
      {children}
      {model.canCustom && showCustom ? (
        <Suspense fallback={<NullLoader />}>
          <Divider />
          <OperateComponent model={model} logicKey={logicKey} />
        </Suspense>
      ) : null}

      <Divider />
      {model.canFavourite && showFav ? <FavMenu source="list" logicId={model.id} logicKey={logicKey} favourite={model.favourite} /> : null}
    </MenuIcon>
  );
}

MenuOperate.propTypes = {
  logicKey: PropTypes.string.isRequired,
  showInfo: PropTypes.bool.isRequired,
  showCustom: PropTypes.bool.isRequired,
  showFav: PropTypes.bool.isRequired,
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
