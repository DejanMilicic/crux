import React from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export function RadioList({ label, id, value, handleChange, required, list }) {
  let selected = value ? value.id : null;
  if (!selected && list && list.length > 0) {
    selected = list[0].id;
    handleChange(selected);
  }

  function handleSubmit(e, selected) {
    e.preventDefault();
    handleChange(selected);
  }

  return (
    <FormControl margin="normal">
      <RadioGroup
        id={id}
        aria-label={label}
        label={label}
        name={id}
        value={selected}
        onChange={handleSubmit}
        required={required}
      >
        {list.map(line => (
          <FormControlLabel
            key={line.id}
            value={line.id}
            control={<Radio />}
            label={line.name}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

RadioList.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  value: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  required: PropTypes.bool
};
