import React, { Fragment } from "react";
import PropTypes from "prop-types";

export default function UserMenu({ logicKey, model }) {
  return <Fragment />;
}

UserMenu.propTypes = {
  logicKey: PropTypes.string.isRequired,
  model: PropTypes.shape({ id: PropTypes.string }).isRequired,
};
