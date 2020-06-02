import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import Fade from "@material-ui/core/Fade";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";

export function MenuIcon({ id, children }) {
  const [state, setState] = useState({ open: false, anchor: null });

  function handleOpen(e) {
    setState({ open: true, anchor: e.currentTarget });
  }

  function handleClose() {
    setState({ open: false, anchor: null });
  }

  return (
    <Fragment>
      <IconButton color="inherit" onClick={handleOpen}>
        <Icon>menu</Icon>
      </IconButton>
      <Menu id={id} open={state.open} onClose={handleClose} TransitionComponent={Fade} anchorEl={state.anchor}>
        {children}
      </Menu>
    </Fragment>
  );
}

MenuIcon.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
