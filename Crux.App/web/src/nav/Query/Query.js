import React, { useContext, Suspense, lazy } from "react";
import SwipableDrawer from "@material-ui/core/SwipeableDrawer";
import { DrawHead } from "components/furniture";
import { NullLoader } from "nav";
import QueryMenu from "./queryMenu";
import { openQuery, closeQuery, selectMenu, MenuStore } from "stores/menu";

export function Query() {
  const { query, dispatchMenu } = selectMenu(useContext(MenuStore));

  const QueryComponent = lazy(() =>
    import("logic/" + query.logicKey + "/" + query.logicKey + "Query")
  );

  return (
    <SwipableDrawer
      variant="persistent"
      anchor="left"
      open={query.isOpen}
      onClose={() => {
        closeQuery(dispatchMenu);
      }}
      onOpen={() => {
        openQuery(dispatchMenu, query.logicKey);
      }}
    >
      <DrawHead callback={closeQuery} dispatch={dispatchMenu}>
        Search
      </DrawHead>
      <QueryMenu>
        <Suspense fallback={<NullLoader />}>
          <QueryComponent logicKey={query.logicKey} />
        </Suspense>
      </QueryMenu>
    </SwipableDrawer>
  );
}
