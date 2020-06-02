import React from "react";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";

export function BackIcon() {
  function handleCancel(e) {
    e.preventDefault();
    window.history.back();
  }

  return (
    <IconButton color="inherit" onClick={handleCancel}>
      <Icon>settings_backup_restore</Icon>
    </IconButton>
  );
}
