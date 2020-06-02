import React from "react";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";
import Hidden from "@material-ui/core/Hidden";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => {
  return {
    heading: {
      color: "white",
      backgroundColor: theme.palette.primary.main,
    },
  };
});

export function TableColumn({ icon, align, width, children }) {
  const classes = useStyles();
  return (
    <TableCell align={align} width={width} className={classes.heading}>
      <Hidden smDown>
        <Typography variant="subtitle2">{children}</Typography>
      </Hidden>
      <Hidden mdUp>{icon ? <Icon>{icon}</Icon> : null}</Hidden>
    </TableCell>
  );
}

TableColumn.propTypes = {
  icon: PropTypes.string,
  align: PropTypes.string,
  width: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
