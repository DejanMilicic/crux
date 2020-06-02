import React, { useContext } from "react";
import { SelectRef } from "components/inputs";
import { updateParams, selectCurrent, ListStore } from "stores/list";

export default function MsgQuery() {
  const { params, dispatchList } = selectCurrent(useContext(ListStore));

  function setRecipientId(value) {
    let keys = [];

    if (value) {
      keys = [value];
    }

    updateParams(dispatchList, { ...params, recipients: keys });
  }

  return <SelectRef handleChange={setRecipientId} value={params.recipients && params.recipients.length > 0 ? params.recipients[0] : ""} label="Recipients" id="recipientSelect" logicKey="user" />;
}
