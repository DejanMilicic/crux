import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";

export function NoteList({ list, handleDelete }) {
  return (
    <List>
      {list.map(line => (
        <ListItem key={line.counter}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            flexGrow={1}
          >
            <ListItemAvatar>
              <Avatar alt={line.authorName} src={line.authorProfileThumbUrl} />
            </ListItemAvatar>
            <Box display="flex" flexDirection="row" flexGrow={1}>
              <Typography variant="body1" color="textPrimary">
                {line.text}
              </Typography>
            </Box>
            <IconButton
              aria-label="Delete"
              onClick={() => handleDelete(line.counter)}
            >
              <Icon>delete</Icon>
            </IconButton>
          </Box>
        </ListItem>
      ))}
    </List>
  );
}

NoteList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      counter: PropTypes.number.isRequired,
      authorName: PropTypes.string.isRequired,
      authorProfileThumbUrl: PropTypes.string,
      text: PropTypes.string.isRequired
    })
  ),
  handleDelete: PropTypes.func.isRequired
};
