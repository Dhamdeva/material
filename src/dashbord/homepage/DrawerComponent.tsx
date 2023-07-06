import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import MainNavigator from '../../controller/MainNavigator'

const drawerWidth = 260

export function DrawerComponent() {
  // const history = useNavigate()

  // const handleNavigation = (path: any) => {
  //   history(path)
  // }

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          overflow: 'auto',
          width: drawerWidth,
          background: '#d7eaf3',
          minHeight: '100vh',
        }}
      >
        <List>
          <ListItem>
            <ListItemButton href="/home">
              <ListItemText primary="Home Page" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton href="/userlist">
              <ListItemText primary="User List" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton href="/product">
              <ListItemText primary="Product" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            {/* <ListItemButton href="/signup">
              <ListItemText primary="Sign Up" />
            </ListItemButton> */}
          </ListItem>
        </List>
      </Box>

      {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <MainNavigator />
      </Box> */}
    </Box>
  )
}
