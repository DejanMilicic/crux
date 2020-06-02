import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";

export function ProfileMenu({
  handleChange,
  closeSelect,
  dispatch,
  callback,
  selected,
  value,
  isDialog
}) {
  function handleSelect(value) {
    handleChange(value);

    if (isDialog && closeSelect) {
      callback(dispatch);
    }
  }

  return (
    <ListItem
      button
      onClick={() => {
        handleSelect(value);
      }}
    >
      {value.profileThumbUrl ? (
        <ListItemAvatar>
          <Avatar alt={value.name} src={value.profileThumbUrl} />
        </ListItemAvatar>
      ) : null}
      <ListItemText primary={value.name} />
      {selected ? <Icon>check</Icon> : null}
    </ListItem>
  );
}

ProfileMenu.propTypes = {
  handleChange: PropTypes.func.isRequired,
  closeSelect: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  callback: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  value: PropTypes.shape({
    name: PropTypes.string.isRequired,
    profileThumbUrl: PropTypes.string
  }).isRequired,
  isDialog: PropTypes.bool
};
