import React, { useState } from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export function SelectList({ label, id, value, handleChange, list }) {
  const [open, setOpen] = useState(false);

  function handleSelect(e) {
    handleChange(e.target.value);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        id={id}
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={value}
        onChange={handleSelect}
        inputProps={{ name: id, id: id }}
      >
        {list.map(line => (
          <MenuItem value={line.id} key={line.id}>
            {line.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

SelectList.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
};
