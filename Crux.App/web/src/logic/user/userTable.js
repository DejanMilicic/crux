import React from "react";
import PropTypes from "prop-types";
import Hidden from "@material-ui/core/Hidden";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { TableColumn, EmailCell, OperateCell, ProfileCell, TablePage } from "components/tables";
import { FavIcon } from "components/links";
import { logicKey } from "./userConst";

export default function UserTable({ list, params }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <Hidden only="xs">
            <TableColumn width="48"></TableColumn>
          </Hidden>
          <TableColumn icon="person">Name</TableColumn>
          <Hidden only="xs">
            <TableColumn icon="mail">Email</TableColumn>
          </Hidden>
          <TableColumn align="right">
            <Box pr={3}>Actions</Box>
          </TableColumn>
        </TableRow>
      </TableHead>
      <TableBody>
        {list.data.map((line) => (
          <TableRow key={line.id}>
            <Hidden only="xs">
              <TableCell width="48">{line.canFavourite ? <FavIcon source="list" logicId={line.id} logicKey={logicKey} favourite={line.favourite} /> : null}</TableCell>
            </Hidden>
            <ProfileCell key={line.id} logicId={line.id} logicKey={logicKey} thumbUrl={line.profileThumbUrl}>
              {line.name}
            </ProfileCell>
            <Hidden only="xs">
              <EmailCell>{line.email}</EmailCell>
            </Hidden>
            <OperateCell logicKey={logicKey} model={line} showInfo showEdit showDelete />
          </TableRow>
        ))}
      </TableBody>
      <TablePage total={list.paging.total} take={params.take} skip={params.skip} />
    </Table>
  );
}

UserTable.propTypes = {
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
        favourite: PropTypes.bool,
      })
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
