import React from "react";
import PropTypes from "prop-types";
import Hidden from "@material-ui/core/Hidden";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { TableColumn, OperateCell, ProfileCell, TablePage } from "components/tables";
import { FavIcon } from "components/links";
import { logicKey } from "./tenantConst";

export default function TenantTable({ list, params }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <Hidden smDown>
            <TableColumn width="48"></TableColumn>
          </Hidden>
          <TableColumn icon="business">Name</TableColumn>
          <TableColumn align="right">
            <Box pr={3}>Actions</Box>
          </TableColumn>
        </TableRow>
      </TableHead>
      <TableBody>
        {list.data.map((line) => (
          <TableRow key={line.id}>
            <TableCell width="48">{line.canFavourite ? <FavIcon source="list" logicId={line.id} logicKey={logicKey} favourite={line.favourite} /> : null}</TableCell>
            <ProfileCell key={line.id} logicId={line.id} logicKey={logicKey} thumbUrl={line.profileThumbUrl}>
              {line.name}
            </ProfileCell>
            <OperateCell id={line.id} logicKey={logicKey} model={line} showInfo showEdit showDelete />
          </TableRow>
        ))}
      </TableBody>
      <TablePage total={list.paging.total} take={params.take} skip={params.skip} />
    </Table>
  );
}

TenantTable.propTypes = {
  list: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        profileThumbUrl: PropTypes.string,
        canAdd: PropTypes.bool,
        canEdit: PropTypes.bool,
        canDelete: PropTypes.bool,
        canCustom: PropTypes.bool,
        canFavourite: PropTypes.bool,
        favourite: PropTypes.bool,
      }).isRequired
    ).isRequired,
    paging: PropTypes.shape({
      total: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  params: PropTypes.shape({
    take: PropTypes.number.isRequired,
    skip: PropTypes.number.isRequired,
  }).isRequired,
};
