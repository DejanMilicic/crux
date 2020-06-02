import React, { useContext, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";
import Grid from "@material-ui/core/Grid";
import { Email, FormModel, FormSubmit, FormStatus, Pwd, ShortText, SwitchLabel } from "components/inputs";
import { ProfileInput } from "components/media";
import { generateModel, updateModel, ModelStore } from "stores/model";
import { saveRetain, RetainStore } from "stores/retain";
import { selectUser, UserStore } from "stores/user";
import { logicKey } from "./userConst";

const initialModel = {
  name: "",
  email: "",
  password: "",
  profileId: "",
  profileThumbUrl: "",
  right: {
    canAuth: false,
    canAdmin: false,
    canSuperuser: false
  }
};

export default function UserInput({ dispatch, callback, isDialog }) {
  const { logic, dispatchModel, statusModel } = generateModel(logicKey, useContext(ModelStore), initialModel);

  const { right } = selectUser(useContext(UserStore));
  const { dispatchRetain } = useContext(RetainStore);

  const [viewModel, setViewModel] = useState(logic.model);

  function handleLibrary() {
    updateModel(dispatchModel, { model: viewModel, logicKey });
    saveRetain(dispatchRetain, {
      logicId: viewModel.id,
      logicKey,
      isProfile: true,
      isDialog
    });

    if (isDialog) {
      callback(dispatch);
    }

    navigate("/media");
  }

  function validateForm() {
    return viewModel.name && viewModel.email && (viewModel.password || viewModel.id);
  }

  return (
    <Fragment>
      <FormModel dispatch={dispatchModel} logicKey={logicKey} viewModel={viewModel}>
        <ProfileInput
          id="userInput"
          name="userProfile"
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
        <Email handleChange={email => setViewModel({ ...viewModel, email })} value={viewModel.email} label="Email" id="email" required />
        {logic.model && logic.model.id ? null : <Pwd handleChange={password => setViewModel({ ...viewModel, password })} value={viewModel.password} label="Password" id="password" required />}
        <ShortText handleChange={phone => setViewModel({ ...viewModel, phone })} value={viewModel.phone} label="Phone" id="phone" />
        {right.canAdmin || right.canSuperuser ? (
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid item xs={12} sm={4}>
              <SwitchLabel
                handleChange={canAuth =>
                  setViewModel({
                    ...viewModel,
                    right: { ...viewModel.right, canAuth }
                  })
                }
                value={viewModel.right.canAuth}
                label="Authoriser"
                id="auth"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SwitchLabel
                handleChange={canAdmin =>
                  setViewModel({
                    ...viewModel,
                    right: { ...viewModel.right, canAdmin }
                  })
                }
                value={viewModel.right.canAdmin}
                label="Admin"
                id="admin"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              {right.canSuperuser ? (
                <SwitchLabel
                  handleChange={canSuperuser =>
                    setViewModel({
                      ...viewModel,
                      right: {
                        ...viewModel.right,
                        canSuperuser
                      }
                    })
                  }
                  value={viewModel.right.canSuperuser}
                  label="Superuser"
                  id="superuser"
                />
              ) : null}
            </Grid>
          </Grid>
        ) : null}
        <FormSubmit disabled={!validateForm()} callback={callback} dispatch={dispatch} isDialog={isDialog} />
      </FormModel>
      <FormStatus status={statusModel} />
    </Fragment>
  );
}

UserInput.propTypes = {
  callback: PropTypes.func,
  dispatch: PropTypes.func,
  isDialog: PropTypes.bool.isRequired
};
