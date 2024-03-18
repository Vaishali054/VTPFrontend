import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from '../../api/logout'; 
import { fetchProfile } from '../../api/fetchProfile'

export default function TopNavBar() {
  const [anchorElMenu, setAnchorElMenu] = React.useState(null);
  const navigate = useNavigate();
  const [userId, setUserId] = React.useState('');

  const handleMenu = (event) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };


  const handleProfile = () => {
    setAnchorElAccount(null);
    navigate("/profile");
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
    // Fetch user data when the component mounts
    fetchUserData();
  }, []);

  const handleWatchlist = () => {
    setAnchorElMenu(null);
    if (userId) {
      navigate(`/watchlist/${userId}`);
    } else {
      navigate('/');
      console.error('User ID is not available');
    }
  };

  const handleTradePage = () => {
    setAnchorElMenu(null);
    navigate(`/StocksList`);
  };

  const handlePortfolio = () => {
    setAnchorElMenu(null);
    if (userId) {
      navigate(`/portfolio/${userId}`);
    } else {
      navigate('/');
      console.error('User ID is not available');
    }
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
            </Menu>
            <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
            </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar-account"
                aria-haspopup="true"
                onClick={handleProfile}
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
                <MenuItem onClick={handleCloseAccount}>My account</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </Box>
    </div>
  );
}
