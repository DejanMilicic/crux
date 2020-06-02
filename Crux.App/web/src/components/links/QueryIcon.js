import React, { useContext } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { openQuery, MenuStore } from "stores/menu";

export function QueryIcon({ logicKey, color, children }) {
  const { dispatchMenu } = useContext(MenuStore);

  return (
    <IconButton
      color={color}
      onClick={() => {
        openQuery(dispatchMenu, logicKey);
      }}>
      <Icon>{children}</Icon>
    </IconButton>
  );
}

QueryIcon.propTypes = {
  logicKey: PropTypes.string.isRequired,
  color: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
