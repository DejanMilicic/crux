import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import { ProfileMenu } from "components/links";

export function ResultList({ list, handleChange, dispatch, callback, value }) {
  return (
    <List>
      {list.map(line => (
        <ProfileMenu key={line.id} id={line.id} value={line} handleChange={handleChange} callback={callback} dispatch={dispatch} isDialog={true} closeSelect={true} selected={line.id === value} />
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
  value: PropTypes.string,
  callback: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};
