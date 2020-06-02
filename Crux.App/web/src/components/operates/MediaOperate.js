import React, { useContext } from "react";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { ClickIcon, DloadIcon, FavIcon } from "components/links";
import { NavOperate } from "components/operates";
import { Modal, Delete } from "nav";
import { updateModel, retainModel, ModelStore } from "stores/model";
import { postFilter, selectList, ListStore } from "stores/list";
import { openDialog, closeDialog, replaceDialog, PopStore } from "stores/pop";
import { openRetain, selectRetain, RetainStore } from "stores/retain";
import { selectUser, UserStore } from "stores/user";

export function MediaOperate({
  logicKey,
  visible,
  hasNav,
  handleNav,
  children
}) {
  const { params, dispatchList } = selectList(logicKey, useContext(ListStore));
  const { next, show, hasNext, dispatchRetain } = selectRetain(
    useContext(RetainStore)
  );

  const { dispatchModel, model } = retainModel(next, useContext(ModelStore));
  const { config } = selectUser(useContext(UserStore));
  const { dispatchPop } = useContext(PopStore);

  function handleSelect() {
    if (hasNext) {
      model.profileId = visible.id;
      model.profileThumbUrl = visible.thumbUrl;

      updateModel(dispatchModel, { model, logicKey: next.logicKey });
      openRetain(dispatchRetain, {
        logicId: next.logicId,
        logicKey: next.logicKey
      });
      closeDialog(dispatchPop);

      if (next.isDialog) {
        openDialog(dispatchPop, {
          component: (
            <Modal
              logicId={next.logicId}
              logicKey={next.logicKey}
              dispatch={dispatchPop}
              callback={closeDialog}
            />
          )
        });
      } else {
        if (next.logicId) {
          navigate("/edit/" + next.logicKey + "/" + next.logicId);
        } else {
          navigate("/add/" + next.logicKey);
        }
      }
    }
  }

  function handleDelete(dispatch) {
    replaceDialog(dispatch, {
      component: (
        <Delete
          dispatch={dispatchPop}
          callback={closeDialog}
          logicKey={logicKey}
          logicId={visible.id}
        />
      )
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
    <Grid container direction="row" justify="space-between" alignItems="center">
      <NavOperate
        hasNav={hasNav}
        handleNav={handleNav}
        logicKey={logicKey}
        logicId={visible.id}
      >
        {show ? (
          <Button
            id="select"
            variant="outlined"
            color="primary"
            onClick={handleSelect}
            aria-label="select"
          >
            Select
          </Button>
        ) : (
          <Box display="flex" flexDirection="row">
            {visible.canDelete ? (
              <ClickIcon
                id="delete"
                callback={handleDelete}
                dispatch={dispatchPop}
                logicKey={logicKey}
                aria="delete"
              >
                delete
              </ClickIcon>
            ) : null}
            {visible.canList ? (
              <ClickIcon
                id="list"
                callback={handleList}
                dispatch={dispatchPop}
                logicKey={logicKey}
                aria="list"
              >
                {icon}
              </ClickIcon>
            ) : null}
            <DloadIcon id="download" src={visible.fullUrl} aria="download" />
            {children}
            {visible.canFavourite ? (
              <FavIcon
                id="fav"
                source="display"
                logicId={visible.id}
                logicKey={logicKey}
                favourite={visible.favourite}
              />
            ) : null}
          </Box>
        )}
      </NavOperate>
    </Grid>
  );
}

MediaOperate.propTypes = {
  logicKey: PropTypes.string.isRequired,
  visible: PropTypes.shape({
    id: PropTypes.string,
    thumbUrl: PropTypes.string,
    fullUrl: PropTypes.string,
    canDelete: PropTypes.bool,
    canList: PropTypes.bool,
    canFavourite: PropTypes.bool,
    favourite: PropTypes.bool
  }),
  hasNav: PropTypes.bool.isRequired,
  handleNav: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
