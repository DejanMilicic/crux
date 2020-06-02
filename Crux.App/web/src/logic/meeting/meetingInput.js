import React, { useContext, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { SwitchLabel, DateTime, FormModel, FormSubmit, FormStatus, LongText, PickerInput, SelectRef, SelectInput, ShortText } from "components/inputs";
import { generateModel, updateModel, ModelStore } from "stores/model";
import { logicKey } from "./meetingConst";

const initialModel = {
  name: "",
  text: "",
  when: new Date(),
  meetingTypeId: "",
  isPrivate: false,
  forceNotify: false,
  authorId: "",
  authorName: "",
  attendees: [],
};

export default function MeetingInput({ dispatch, callback, isDialog }) {
  const { logic, dispatchModel, statusModel } = generateModel(logicKey, useContext(ModelStore), initialModel);
  const [viewModel, setViewModel] = useState(logic.model);

  function validateForm() {
    return viewModel.name && viewModel.attendees.length >= 2;
  }

  function updateAuthor(author) {
    setViewModel({
      ...viewModel,
      authorId: author.id,
      authorName: author.name,
    });
    updateModel(dispatchModel, {
      model: { ...viewModel, authorId: author.id, authorName: author.name },
      logicKey,
    });
  }

  function updateAttendees(attendees) {
    setViewModel({ ...viewModel, attendees });
    updateModel(dispatchModel, {
      model: { ...viewModel, attendees },
      logicKey,
    });
  }

  return (
    <Fragment>
      <FormModel dispatch={dispatchModel} logicKey={logicKey} viewModel={viewModel}>
        <ShortText handleChange={(name) => setViewModel({ ...viewModel, name })} value={viewModel.name} label="Title" id="name" required requiredText="name" autoFocus />
        <LongText handleChange={(text) => setViewModel({ ...viewModel, text })} value={viewModel.text} label="Description" id="description" rows={4} />
        <DateTime handleChange={(when) => setViewModel({ ...viewModel, when })} value={viewModel.when} label="Meeting" id="when" required />
        <SelectRef handleChange={(meetingTypeId) => setViewModel({ ...viewModel, meetingTypeId })} value={viewModel.meetingTypeId} label="Meeting Type" id="meetingTypeSelect" logicKey="meetingType" required />
        {viewModel.authorId ? (
          <SelectInput handleChange={(author) => updateAuthor(author)} value={viewModel.authorId} name={viewModel.authorName} label="Owner" id="author" logicKey="user">
            select
          </SelectInput>
        ) : null}
        <PickerInput immediateHandle={false} handleChange={(attendees) => updateAttendees(attendees)} value={viewModel.attendees} label="Attendees" id="attendees" logicKey="user" required>
          select
        </PickerInput>
        <SwitchLabel handleChange={(isPrivate) => setViewModel({ ...viewModel, isPrivate })} value={viewModel.isPrivate} label="Is Private" id="isPrivate" />
        <FormSubmit callback={callback} dispatch={dispatch} isDialog={isDialog} disabled={!validateForm()} />
      </FormModel>
      <FormStatus status={statusModel} />
    </Fragment>
  );
}

MeetingInput.propTypes = {
  callback: PropTypes.func,
  dispatch: PropTypes.func,
  isDialog: PropTypes.bool.isRequired,
};
