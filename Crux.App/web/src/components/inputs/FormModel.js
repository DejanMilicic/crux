import React from "react";
import PropTypes from "prop-types";
import { postModel } from "stores/model";

export function FormModel({ children, dispatch, logicKey, viewModel }) {
  function handleSubmit(e) {
    e.preventDefault();
    postModel(dispatch, { model: viewModel, logicKey: logicKey });
  }

  return <form onSubmit={handleSubmit}>{children}</form>;
}

FormModel.propTypes = {
  dispatch: PropTypes.func,
  logicKey: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  viewModel: PropTypes.shape({}).isRequired
};
