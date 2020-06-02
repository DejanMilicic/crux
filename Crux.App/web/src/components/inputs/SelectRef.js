import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { postRef, selectRef, RefStore } from "stores/ref";
import { SelectList } from "./SelectList";

export function SelectRef({
  label,
  id,
  value,
  handleChange,
  logicKey,
  params,
  required
}) {
  const { logic, dispatchRef, statusRef } = selectRef(
    logicKey,
    useContext(RefStore)
  );

  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (!logic || (statusRef.isReady && refresh)) {
      postRef(dispatchRef, { params, logicKey });
      setRefresh(false);
    }
  }, [dispatchRef, logic, params, logicKey, refresh, statusRef]);

  if (
    required &&
    !value &&
    logic &&
    logic.model &&
    logic.model.data.length > 0
  ) {
    value = logic.model.data[0].id;
    handleChange(value);
  }

  return logic && statusRef.isReady && statusRef.isLoaded ? (
    <SelectList
      id={id}
      label={label}
      list={logic.model.data}
      value={value}
      handleChange={handleChange}
    />
  ) : null;
}

SelectRef.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  logicKey: PropTypes.string.isRequired,
  params: PropTypes.shape({}),
  required: PropTypes.bool
};
