import React from "react";
import PropTypes from "prop-types";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { PageAction } from "./PageAction";

export function TablePage({ total, take, skip }) {
  return (
    <TableFooter>
      <TableRow>
        <TablePagination count={total} rowsPerPage={take} page={skip} onChangePage={() => {}} rowsPerPageOptions={[]} ActionsComponent={PageAction} />
      </TableRow>
    </TableFooter>
  );
}

TablePage.propTypes = {
  total: PropTypes.number.isRequired,
  take: PropTypes.number.isRequired,
  skip: PropTypes.number.isRequired
};
