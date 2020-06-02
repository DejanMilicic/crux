import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { DialogHead } from "components/furniture";
import { ShortText } from "components/inputs";
import { ClickIcon } from "components/links";
import { ResultList } from "./resultList";
import { postRef, selectRef, RefStore } from "stores/ref";

export function Selection({ logicKey, callback, dispatch, params, value, handleChange, label }) {
  const { logic, dispatchRef, statusRef } = selectRef(logicKey, useContext(RefStore));
  const [refresh, setRefresh] = useState(true);

  function handleSearch(value) {
    const search = { ...logic.params, search: value };
    postRef(dispatchRef, { params: search, logicKey });
  }

  function handleFavourite() {
    const fav = {
      ...logic.params,
      favouriteRestrict: !logic.params.favouriteRestrict,
    };
    postRef(dispatchRef, { params: fav, logicKey });
  }

  useEffect(() => {
    if (!logic || (statusRef.isReady && !statusRef.isLoaded) || refresh) {
      postRef(dispatchRef, { params, logicKey });
      setRefresh(false);
    }
  }, [dispatchRef, logic, params, logicKey, refresh, statusRef]);

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
      {logic ? (
        <DialogContent>
          <Box display="flex" flexDirection="row" alignItems="flex-end">
            <ShortText id="selectSearch" value={logic.params.search} label="filter" handleChange={handleSearch} />
            <ClickIcon id="favouriteSearch" aria="favourite" callback={handleFavourite}>
              {logic.params.favouriteRestrict ? "favorite" : "favorite_border"}
            </ClickIcon>
          </Box>
          {statusRef.isReady && statusRef.isLoaded ? <ResultList logicKey={logicKey} list={logic.model.data} value={value} handleChange={handleChange} callback={callback} dispatch={dispatch} /> : null}
        </DialogContent>
      ) : null}
    </Dialog>
  );
}

Selection.propTypes = {
  logicKey: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.shape({
    search: PropTypes.string,
    TenantRestrict: PropTypes.bool,
    favouriteRestrict: PropTypes.bool,
  }),
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
