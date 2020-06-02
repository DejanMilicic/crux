import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { postRef, selectRef, RefStore } from "stores/ref";
import { RadioList } from "./RadioList";

export function RadioRef({ label, id, value, handleChange, logicKey, params }) {
  const { logic, dispatchRef, statusRef } = selectRef(
    logicKey,
    useContext(RefStore)
  );
  const [refresh] = useState(true);

  useEffect(() => {
    if (!logic || (statusRef.isReady && refresh)) {
      postRef(dispatchRef, { params, logicKey });
    }
  }, [dispatchRef, logic, params, logicKey, refresh, statusRef]);

  return logic && statusRef.isReady && statusRef.isLoaded ? (
    <RadioList
      id={id}
      label={label}
      list={logic.model.data}
      value={value}
      handleChange={handleChange}
      logicKey={logicKey}
    />
  ) : null;
}

RadioRef.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
  handleChange: PropTypes.func.isRequired,
  logicKey: PropTypes.string.isRequired,
  params: PropTypes.shape({}).isRequired
};
