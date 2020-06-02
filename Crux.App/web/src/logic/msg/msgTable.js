import React from "react";
import PropTypes from "prop-types";
import Hidden from "@material-ui/core/Hidden";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { TableColumn, DateCell, NameCell, OperateCell, ProfilesCell, TablePage } from "components/tables";
import { FavIcon } from "components/links";
import { logicKey } from "./msgConst";

export default function MsgTable({ list, params }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <Hidden smDown>
            <TableColumn width="48"></TableColumn>
          </Hidden>
          <TableColumn icon="people">Recipients</TableColumn>
          <TableColumn icon="subject">Subject</TableColumn>
          <Hidden smDown>
            <TableColumn icon="alarm">Sent</TableColumn>
          </Hidden>
          <TableColumn align="right">
            <Box pr={3}>Actions</Box>
          </TableColumn>
        </TableRow>
      </TableHead>
      <TableBody>
        {list.data.map((line) => (
          <TableRow key={line.id}>
            <Hidden smDown>
              <TableCell width="48">{line.canFavourite ? <FavIcon source="list" logicId={line.id} logicKey={logicKey} favourite={line.favourite} /> : null}</TableCell>
            </Hidden>
            <ProfilesCell list={line.recipients} logicKey="user" />
            <NameCell key={line.id} logicId={line.id} logicKey={logicKey}>
              {line.name}
            </NameCell>
            <Hidden smDown>
              <DateCell date={line.dateCreated} />
            </Hidden>
            <OperateCell logicKey={logicKey} model={line} showInfo showEdit showDelete />
          </TableRow>
        ))}
      </TableBody>
      <TablePage total={list.paging.total} take={params.take} skip={params.skip} />
    </Table>
  );
}

MsgTable.propTypes = {
  list: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        profileThumbUrl: PropTypes.string,
        recipients: PropTypes.array.isRequired,
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
