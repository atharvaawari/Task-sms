import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';

const Sidebar = ({ open, onClose }) => {
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
      onClose={onClose}
    >
      <div style={{ width: 240 }}>
        <List>
          <ListItem button="true">
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button="true">
            <ListItemText primary="Users" />
          </ListItem>
        </List>
        <Divider />
      </div>
    </Drawer>
  );
};

export default Sidebar;
