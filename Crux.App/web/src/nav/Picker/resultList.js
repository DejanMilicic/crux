import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import { ProfileMenu } from "components/links";

export function ResultList({ list, value, callback, dispatch, handleChange }) {
  list.forEach(line => {
    const selected = value.find(e => e.id === line.id);

    if (selected) {
      line.selected = true;
    } else {
      line.selected = false;
    }
  });

  return (
    <List>
      {list.map(line => (
        <ProfileMenu key={line.id} id={line.id} value={line} handleChange={handleChange} callback={callback} dispatch={dispatch} isDialog={true} closeSelect={false} selected={line.selected} />
      ))}
    </List>
  );
}

ResultList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      selected: PropTypes.bool
    })
  ).isRequired,
  value: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  ),
  callback: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};
