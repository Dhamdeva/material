import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MainNavigator from '../../controller/MainNavigator';

const drawerWidth = 260;

export function DrawerComponent() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          overflow: 'hidden',
          width: drawerWidth,
          background: '#d7eaf3',
          minHeight: '100vh',
        }}
      >
        <List>
          <ListItem>
            <Link to="/homepage" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemText primary="Home Page" />
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/userlist" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemText primary="User List" />
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/product" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemText primary="Product" />
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/productlist" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemText primary="Product List" />
            </Link>
          </ListItem>
          <ListItem>
          <Link to="/productdesign" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemText primary="Product Design" />
            </Link>
          </ListItem>
        </List>
      </Box>
      {/* <Box sx={{width:'80%'}}>
        <MainNavigator />
      </Box> */}
    </Box>
  );
}

