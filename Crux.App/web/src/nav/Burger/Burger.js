import React, { useContext } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { DrawHead } from "components/furniture";
import { MainMenu } from "./mainMenu";
import { resetFilter, ListStore } from "stores/list";
import { openBurger, closeBurger, selectMenu, MenuStore } from "stores/menu";
import { selectUser, UserStore } from "stores/user";

export function Burger() {
  const { burger, dispatchMenu } = selectMenu(useContext(MenuStore));
  const { config } = selectUser(useContext(UserStore));
  const { dispatchList } = useContext(ListStore);

  function handleReset() {
    resetFilter(dispatchList, { take: config.take });
  }

  return (
    <SwipeableDrawer
      open={burger.isOpen}
      onClose={() => {
        closeBurger(dispatchMenu);
      }}
      onOpen={() => {
        openBurger(dispatchMenu);
      }}
    >
      <div
        tabIndex={0}
        role="button"
        onClick={() => {
          closeBurger(dispatchMenu);
        }}
        onKeyDown={() => {
          closeBurger(dispatchMenu);
        }}
      >
        <DrawHead callback={closeBurger} dispatch={dispatchMenu}>
          Menu
        </DrawHead>
        <MainMenu handleReset={handleReset} />
      </div>
    </SwipeableDrawer>
  );
}
