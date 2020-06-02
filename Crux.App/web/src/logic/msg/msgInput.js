import React, { useContext, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { CheckLabel, FormModel, FormSubmit, FormStatus, LongText, PickerInput, ShortText } from "components/inputs";
import { generateModel, updateModel, ModelStore } from "stores/model";
import { logicKey } from "./msgConst";

const initialModel = {
  name: "",
  text: "",
  recipients: [],
  files: [],
  isPrivate: false,
  forceNotify: false,
};

export default function MsgInput({ dispatch, callback, isDialog }) {
  const { logic, dispatchModel, statusModel } = generateModel(logicKey, useContext(ModelStore), initialModel);
  const [viewModel, setViewModel] = useState(logic.model);

  function validateForm() {
    return viewModel.name && viewModel.recipients.length >= 1;
  }

  function updateRecipients(recipients) {
    setViewModel({ ...viewModel, recipients });
    updateModel(dispatchModel, {
      model: { ...viewModel, recipients },
      logicKey,
    });
  }

  return (
    <Fragment>
      <FormModel dispatch={dispatchModel} logicKey={logicKey} viewModel={viewModel}>
        <PickerInput immediateHandle={false} handleChange={(recipients) => updateRecipients(recipients)} value={viewModel.recipients} label="Recipients" id="recipients" logicKey="user" required>
          select
        </PickerInput>
        <ShortText handleChange={(name) => setViewModel({ ...viewModel, name })} value={viewModel.name} label="Subject" id="subject" required requiredText="subject" autoFocus />
        <LongText handleChange={(text) => setViewModel({ ...viewModel, text })} value={viewModel.text} label="Message" id="message" rows={4} />
        <CheckLabel handleChange={(isPrivate) => setViewModel({ ...viewModel, isPrivate })} value={viewModel.isPrivate} label="Is Private" id="isPrivate" />
        <CheckLabel handleChange={(forceNotify) => setViewModel({ ...viewModel, forceNotify })} value={viewModel.forceNotify} label="Force Notification" id="forceNotify" />
        <FormSubmit callback={callback} dispatch={dispatch} isDialog={isDialog} disabled={!validateForm()} />
      </FormModel>
      <FormStatus status={statusModel} />
    </Fragment>
  );
}

MsgInput.propTypes = {
  callback: PropTypes.func,
  dispatch: PropTypes.func,
  isDialog: PropTypes.bool.isRequired,
};
