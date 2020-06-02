import PropTypes from "prop-types";

export default function MsgOperate({ logicKey, model, color }) {
  return null;
}

MsgOperate.propTypes = {
  logicKey: PropTypes.string.isRequired,
  model: PropTypes.shape({ id: PropTypes.string }),
  color: PropTypes.string,
};
