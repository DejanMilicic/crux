import React, { useContext } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { DrawHead } from "components/furniture";
import { SettingsMenu } from "./settingsMenu";
import {
  openSettings,
  closeSettings,
  selectMenu,
  MenuStore
} from "stores/menu";

export function Settings() {
  const { settings, dispatchMenu } = selectMenu(useContext(MenuStore));

  return (
    <SwipeableDrawer
      anchor="right"
      open={settings.isOpen}
      onClose={() => {
        closeSettings(dispatchMenu);
      }}
      onOpen={() => {
        openSettings(dispatchMenu);
      }}
    >
      <div
        tabIndex={0}
        role="button"
        onClick={() => {
          closeSettings(dispatchMenu);
        }}
        onKeyDown={() => {
          closeSettings(dispatchMenu);
        }}
      >
        <DrawHead callback={closeSettings} dispatch={dispatchMenu}>
          Settings
        </DrawHead>
        <SettingsMenu />
      </div>
    </SwipeableDrawer>
  );
}
