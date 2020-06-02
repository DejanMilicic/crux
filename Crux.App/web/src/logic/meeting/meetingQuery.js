import React, { useContext } from "react";
import { SelectRef } from "components/inputs";
import { updateParams, selectCurrent, ListStore } from "stores/list";

export default function MeetingQuery() {
  const { params, dispatchList } = selectCurrent(useContext(ListStore));

  function setParticipantId(value) {
    let keys = [];

    if (value) {
      keys = [value];
    }

    updateParams(dispatchList, { ...params, participantKeys: keys });
  }

  return <SelectRef handleChange={setParticipantId} value={params.participantKeys && params.participantKeys.length > 0 ? params.participantKeys[0] : ""} label="Participant" id="participantSelect" logicKey="user" />;
}
