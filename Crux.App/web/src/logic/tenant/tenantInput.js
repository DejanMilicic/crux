import React, { useContext, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";
import { FormModel, FormSubmit, FormStatus, ShortText } from "components/inputs";
import { ProfileInput } from "components/media";
import { updateModel, generateModel, ModelStore } from "stores/model";
import { saveRetain, RetainStore } from "stores/retain";
import { logicKey } from "./tenantConst";

const initialModel = {
  name: "",
  profileId: "",
  profileThumbUrl: ""
};

export default function TenantInput({ dispatch, callback, isDialog }) {
  const { logic, dispatchModel, statusModel } = generateModel(logicKey, useContext(ModelStore), initialModel);

  const { dispatchRetain } = useContext(RetainStore);
  const [viewModel, setViewModel] = useState(logic.model);

  function handleLibrary() {
    updateModel(dispatchModel, { model: viewModel, logicKey });
    saveRetain(dispatchRetain, {
      logicId: viewModel.id,
      logicKey: logicKey,
      isProfile: true,
      isDialog: isDialog
    });
    if (isDialog) {
      callback(dispatch);
    }
    navigate("/media");
  }

  function validateForm() {
    return viewModel.name.length > 0;
  }

  return (
    <Fragment>
      <FormModel dispatch={dispatchModel} logicKey={logicKey} viewModel={viewModel}>
        <ProfileInput
          id={viewModel.id}
          name="tenantProfile"
          profileId={viewModel.profileId}
          profileThumbUrl={viewModel.profileThumbUrl}
          handleChange={profile =>
            setViewModel({
              ...viewModel,
              profileId: profile.id,
              profileThumbUrl: profile.thumbUrl
            })
          }
          handleLibrary={handleLibrary}
        />
        <ShortText handleChange={name => setViewModel({ ...viewModel, name })} value={viewModel.name} label="Name" id="name" autoFocus required requiredText="name" />
        <FormSubmit disabled={!validateForm()} callback={callback} dispatch={dispatch} isDialog={isDialog} />
      </FormModel>
      <FormStatus status={statusModel} />
    </Fragment>
  );
}

TenantInput.propTypes = {
  callback: PropTypes.func,
  dispatch: PropTypes.func,
  isDialog: PropTypes.bool.isRequired
};
