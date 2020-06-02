import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { DialogHead } from "components/furniture";
import { ShortText } from "components/inputs";
import { ClickIcon } from "components/links";
import { ResultList } from "./resultList";
import { postRef, selectRef, RefStore } from "stores/ref";

export function Picker({ logicKey, dispatch, callback, params, value, immediateHandle, handleChange, label }) {
  const { logic, dispatchRef, statusRef } = selectRef(logicKey, useContext(RefStore));

  const [selected, setSelected] = useState(value.slice(0));
  const [refresh, setRefresh] = useState(true);

  function handleSearch(value) {
    const searched = { ...logic.params, search: value };
    postRef(dispatchRef, { params: searched, logicKey });
  }

  function handleFavourite() {
    const params = {
      ...logic.params,
      favouriteRestrict: !logic.params.favouriteRestrict,
    };
    postRef(dispatchRef, { params, logicKey });
  }

  useEffect(() => {
    if (!logic || (statusRef.isReady && !statusRef.isLoaded) || refresh) {
      postRef(dispatchRef, { params, logicKey });
      setRefresh(false);
    }
  }, [dispatchRef, logic, params, logicKey, refresh, statusRef]);

  function handleSelection(value) {
    const existing = selected.find((e) => e.id === value.id);

    if (existing) {
      selected.splice(selected.indexOf(existing), 1);
    } else {
      selected.push(value);
    }

    setSelected(selected.slice(0));

    if (immediateHandle) {
      handleChange(selected.slice(0));
    }
  }

  function handleSave() {
    callback(dispatch);
    handleChange(selected);
  }

  return (
    <Dialog
      open={true}
      onClose={() => {
        callback(dispatch);
      }}
      aria-labelledby="form-dialog-title">
      <DialogHead callback={callback} dispatch={dispatch}>
        {label}
      </DialogHead>
      <DialogContent>
        <Box display="flex" flexDirection="row" alignItems="flex-end">
          <ShortText id="pickerSearch" value={logic.params.search} label="filter" handleChange={handleSearch} />
          <ClickIcon id="favSearch" callback={handleFavourite} aria="favourite">
            {logic.params.favouriteRestrict ? "favorite" : "favorite_border"}
          </ClickIcon>
        </Box>
        {logic && statusRef.isReady && statusRef.isLoaded ? <ResultList logicKey={logicKey} list={logic.model.data} value={selected} handleChange={handleSelection} callback={callback} dispatch={dispatch} /> : null}
      </DialogContent>
      {!immediateHandle ? (
        <DialogActions>
          <Button color="primary" variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      ) : null}
    </Dialog>
  );
}

Picker.propTypes = {
  logicKey: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.shape({
    search: PropTypes.string,
    TenantRestrict: PropTypes.bool,
    favouriteRestrict: PropTypes.bool,
  }),
  value: PropTypes.array,
  immediateHandle: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
