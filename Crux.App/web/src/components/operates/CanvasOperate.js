import React, { useContext, Suspense, lazy } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { NullLoader } from "nav";
import { NavIcon, FavIcon } from "components/links";
import { selectUser, UserStore } from "stores/user";

export function CanvasOperate({ logicKey, model, children, showAdd, showEdit, showDelete, showList, showCustom, showFav, source }) {
  const { config } = selectUser(useContext(UserStore));

  const OperateComponent = lazy(() => import("logic/" + logicKey + "/" + logicKey + "Operate"));

  let icon = "list";

  if (config.templateView === "wall") {
    icon = "grid_on";
  }

  return (
    <Grid container direction="row" justify="space-evenly" alignItems="center">
      {model.canAdd && showAdd ? (
        <Grid item>
          <NavIcon to={"/add/" + logicKey} replace="true">
            add
          </NavIcon>
        </Grid>
      ) : null}
      {model.canEdit && showEdit ? (
        <Grid item>
          <NavIcon to={"/edit/" + logicKey + "/" + model.id} replace="true">
            edit
          </NavIcon>
        </Grid>
      ) : null}
      {model.canDelete && showDelete ? (
        <Grid item>
          <NavIcon to={"/delete/" + logicKey + "/" + model.id} replace="true">
            delete
          </NavIcon>
        </Grid>
      ) : null}
      {model.canList && showList ? (
        <Grid item>
          <NavIcon to={"/table/" + logicKey} replace="true">
            {icon}
          </NavIcon>
        </Grid>
      ) : null}
      {model.canCustom && showCustom ? (
        <Suspense fallback={<NullLoader />}>
          <OperateComponent logicKey={logicKey} model={model} />
        </Suspense>
      ) : null}
      {children}
      {model.canFavourite && showFav ? (
        <Grid item>
          <FavIcon source={source} logicId={model.id} logicKey={logicKey} favourite={model.favourite} />
        </Grid>
      ) : null}
    </Grid>
  );
}

CanvasOperate.propTypes = {
  logicKey: PropTypes.string.isRequired,
  showAdd: PropTypes.bool,
  showEdit: PropTypes.bool,
  showDelete: PropTypes.bool,
  showList: PropTypes.bool,
  showCustom: PropTypes.bool,
  showFav: PropTypes.bool,
  source: PropTypes.string.isRequired,
  model: PropTypes.shape({
    id: PropTypes.string,
    canAdd: PropTypes.bool,
    canEdit: PropTypes.bool,
    canDelete: PropTypes.bool,
    canList: PropTypes.bool,
    canCustom: PropTypes.bool,
    canFavourite: PropTypes.bool,
    favourite: PropTypes.bool,
  }),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
