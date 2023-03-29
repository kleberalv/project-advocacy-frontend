import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../theme/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

function UserDashboard() {

  const theme = createTheme();
  const { state } = useLocation();
  const navigate = useNavigate();
  const token = state?.token;
  const user = state?.user[0];

  useEffect(() => {
    if (!state?.token) {
      navigate('/login');
    }
  }, [state, navigate]);
  const drawerWidth = 240;

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      {token && (
        <ThemeProvider theme={theme}>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#2c2c2c' }}>
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={() => setOpen(!open)}
                >
                  {open ? <ChevronLeftIcon sx={{ color: "#BC953D" }} /> : <MenuIcon sx={{ color: "#BC953D" }} />}
                </IconButton>
                <Navbar />
              </Toolbar>
            </AppBar>

            <Drawer
              variant="temporary"
              open={open}
              onClose={() => setOpen(false)}
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
              }}
            >
              <Toolbar />
              <Box sx={{ overflow: 'auto' }}>
                <List>
                  {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                <Divider />
                <List>
                  {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={() => setOpen(true)}
                  edge="start"
                  sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                  <MenuIcon />
                </IconButton>
              </Toolbar>
              <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                sapien faucibus et molestie ac.
              </Typography>
            </Box>
          </Box>
        </ThemeProvider>
      )}
    </>
  );

}

export default UserDashboard;
