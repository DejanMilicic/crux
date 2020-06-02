import React from "react";
import PropTypes from "prop-types";
import Hidden from "@material-ui/core/Hidden";
import TableCell from "@material-ui/core/TableCell";
import { ListOperate, MenuOperate } from "components/operates";

export function OperateCell({ logicKey, showInfo, showEdit, showDelete, showCustom, showFav, model, children }) {
  return (
    <TableCell align="right">
      <Hidden smDown>
        <ListOperate logicKey={logicKey} showInfo={false} showEdit={showEdit} showDelete={showDelete} showCustom={showCustom} showFav={showFav} model={model} />
      </Hidden>
      <Hidden mdUp>
        <MenuOperate logicKey={logicKey} showInfo={showInfo} showCustom showFav model={model} />
      </Hidden>
    </TableCell>
  );
}

OperateCell.propTypes = {
  props: PropTypes.shape({}),
};
