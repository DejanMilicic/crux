import React, { Fragment } from "react";
import PropTypes from "prop-types";

export default function MsgMenu({ logicKey, model }) {
  return <Fragment />;
}

MsgMenu.propTypes = {
  logicKey: PropTypes.string.isRequired,
  model: PropTypes.shape({ id: PropTypes.string }).isRequired,
};
