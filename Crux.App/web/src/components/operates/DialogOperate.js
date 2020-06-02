import React, { useContext, Suspense, lazy } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import { ClickIcon, FavIcon } from "components/links";
import { NavOperate } from "components/operates";
import { Modal, Delete, NullLoader } from "nav";
import { closeDialog, replaceDialog, PopStore } from "stores/pop";
import { postFilter, selectList, ListStore } from "stores/list";
import { selectUser, UserStore } from "stores/user";

export function DialogOperate({ logicKey, model, hasNav, handleNav, children }) {
  const { params, dispatchList } = selectList(logicKey, useContext(ListStore));
  const { config } = selectUser(useContext(UserStore));
  const { dispatchPop } = useContext(PopStore);

  const OperateComponent = lazy(() => import("logic/" + logicKey + "/" + logicKey + "Operate"));

  function handleAdd(dispatch) {
    replaceDialog(dispatch, {
      component: <Modal dispatch={dispatchPop} callback={closeDialog} logicKey={logicKey} />,
    });
  }

  function handleEdit(dispatch) {
    replaceDialog(dispatch, {
      component: <Modal dispatch={dispatchPop} callback={closeDialog} logicKey={logicKey} logicId={model.id} />,
    });
  }

  function handleDelete(dispatch) {
    replaceDialog(dispatch, {
      component: <Delete dispatch={dispatchPop} callback={closeDialog} logicKey={logicKey} logicId={model.id} />,
    });
  }

  function handleList(dispatch) {
    closeDialog(dispatch);
    postFilter(dispatchList, { params, logicKey });
  }

  let icon = "list";

  if (config.templateView === "wall") {
    icon = "grid_on";
  }

  return (
    <Box display="flex" flexDirection="row">
      <NavOperate hasNav={hasNav} handleNav={handleNav} logicId={model.id} logicKey={logicKey}>
        {model.canAdd ? (
          <ClickIcon id="add" callback={handleAdd} dispatch={dispatchPop} aria="add">
            add
          </ClickIcon>
        ) : null}
        {model.canEdit ? (
          <ClickIcon id="edit" callback={handleEdit} dispatch={dispatchPop} aria="edit">
            edit
          </ClickIcon>
        ) : null}
        {model.canDelete ? (
          <ClickIcon id="delete" callback={handleDelete} dispatch={dispatchPop} logicKey={logicKey} aria="delete">
            delete
          </ClickIcon>
        ) : null}
        {model.canList ? (
          <ClickIcon id="list" callback={handleList} dispatch={dispatchPop} logicKey={logicKey} aria="list">
            {icon}
          </ClickIcon>
        ) : null}
        {model.canCustom ? (
          <Suspense fallback={<NullLoader />}>
            <OperateComponent logicKey={logicKey} model={model} />
          </Suspense>
        ) : null}
        {children}
        {model.canFavourite ? <FavIcon id="fav" source="display" logicId={model.id} logicKey={logicKey} favourite={model.favourite} /> : null}
      </NavOperate>
    </Box>
  );
}

DialogOperate.propTypes = {
  logicKey: PropTypes.string.isRequired,
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
  hasNav: PropTypes.bool,
  handleNav: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
