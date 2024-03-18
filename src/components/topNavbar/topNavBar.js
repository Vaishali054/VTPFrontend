import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';
import { fetchProfile } from '../../api/profile'
import { handleLogout } from '../../api/logout';

export default function TopNavBar() {
  const [anchorElMenu, setAnchorElMenu] = React.useState(null);
  const [anchorElAccount, setAnchorElAccount] = React.useState(null);
  const navigate = useNavigate();
  const [userId, setUserId] = React.useState('');

  const handleMenu = (event) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  const handleAccount = (event) => {
    setAnchorElAccount(event.currentTarget);
  };

  const handleCloseAccount = () => {
    setAnchorElAccount(null);
  };

  const handleProfile = () => {
    setAnchorElAccount(null);
    if (userId) {
      navigate(`/profile/${userId}`);
    } else {
      console.error('User ID is not available');
    }
  };

  const handleLogoutClick = async () => {
    try {
      await handleLogout();
      console.log('Logout successful');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const data = await fetchProfile();
      if (data) {
        setUserId(data.user.id);
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  React.useEffect(() => {
    fetchUserData();
  }, []);

  const handleWatchlist = () => {
    setAnchorElMenu(null);
    if (userId) {
      navigate(`/watchlist/${userId}`);
    } else {
      console.error('User ID is not available');
    }
  };

  const handlePortfolio = () => {
    setAnchorElMenu(null);
    if (userId) {
      navigate(`/portfolio/${userId}`);
    } else {
      console.error('User ID is not available');
    }
  };

  const handleHistory = () => {
    setAnchorElMenu(null);
    if (userId) {
      navigate(`/history/${userId}`); 
    } else {
      console.error('User ID is not available');
    }
  };

  const handleTradePage = () => {
    setAnchorElMenu(null);
    navigate(`/StocksList`); 
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElMenu)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={handleWatchlist}>Watchlist</MenuItem>
              <MenuItem onClick={handlePortfolio}>Portfolio</MenuItem>
              <MenuItem onClick={handleTradePage}>Trade Page</MenuItem>
              <MenuItem onClick={handleHistory}>History</MenuItem> {/* History option */}
            </Menu>
            <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
            </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar-account"
                aria-haspopup="true"
                onClick={handleAccount}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar-account"
                anchorEl={anchorElAccount}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElAccount)}
                onClose={handleCloseAccount}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem> {/* Logout option */}
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </Box>
    </div>
  );
}
