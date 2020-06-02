import React, { useContext } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { QuerySubmit } from "components/furniture";
import { ShortText, CheckLabel, SelectRef } from "components/inputs";
import {
  postFilter,
  updateParams,
  resetFilter,
  selectCurrent,
  ListStore
} from "stores/list";
import { selectUser, UserStore } from "stores/user";
import { closeQuery, MenuStore } from "stores/menu";

export default function QueryMenu({ children }) {
  const { logicKey, params, dispatchList } = selectCurrent(
    useContext(ListStore)
  );

  const { dispatchMenu } = useContext(MenuStore);
  const { right } = selectUser(useContext(UserStore));

  function setSearch(value) {
    updateParams(dispatchList, { ...params, search: value });
  }

  function setFavourite(value) {
    updateParams(dispatchList, { ...params, favouriteRestrict: value });
  }

  function setTenant(value) {
    updateParams(dispatchList, { ...params, TenantRestrict: value });
  }

  function setAuthor(value) {
    let keys = [];

    if (value) {
      keys = [value];
    }

    updateParams(dispatchList, { ...params, authorKeys: keys });
  }

  function handleSearch(e) {
    e.preventDefault();
    postFilter(dispatchList, { params, logicKey });
    closeQuery(dispatchMenu);
  }

  function handleReset(e) {
    e.preventDefault();
    resetFilter(dispatchList, { take: params.take });
  }

  return (
    <form onSubmit={handleSearch}>
      <Box width={250} p={1}>
        <ShortText
          id="searchQuery"
          handleChange={setSearch}
          value={params.search}
          label="Search"
        />
        <CheckLabel
          id="favQuery"
          handleChange={setFavourite}
          value={params.favouriteRestrict}
          label="Favourite Only"
        />
        {children}
        <SelectRef
          handleChange={setAuthor}
          value={params.authorKeys.length > 0 ? params.authorKeys[0] : ""}
          label="Author"
          id="authorSelect"
          logicKey="user"
        />
        {right.canSuperUser ? (
          <CheckLabel
            id="tenantQuery"
            handleChange={setTenant}
            value={params.TenantRestrict}
            label="Tenant Only"
          />
        ) : null}
        <Button
          id="searchReset"
          aria-label="reset"
          variant="outlined"
          color="secondary"
          onClick={handleReset}
        >
          <Box width={60}>Reset</Box>
        </Button>
        <QuerySubmit
          callback={closeQuery}
          dispatch={dispatchMenu}
          isDialog={true}
        />
      </Box>
    </form>
  );
}

QueryMenu.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
