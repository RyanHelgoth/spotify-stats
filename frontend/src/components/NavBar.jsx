import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { NavLink } from 'react-router-dom';
import "./NavBar.css"

const pages = ['search', 'top viewed songs', 'about'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const activeClassName = "activeNavButton";
  const inactiveClassName = "inactiveNavButton";

  // https://www.color-hex.com/color-palette/53188
  // TODO add key for nav links

  return (
    <AppBar sx={{backgroundColor: "#121212", mb: 7}} position="sticky">
      <Container maxWidth="false">
        <Toolbar disableGutters>
          <EqualizerIcon sx={{color: "#1ed760", display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Spotify Song Stats
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                  "& .MuiPaper-root": {
                    backgroundColor: "#212121"
                  }
                }}
              >
                {pages.map((page) => (
                  <NavLink 
                      // regex to remove spaces
                      // https://stackoverflow.com/a/48678145
                      to={page === "search" ? "/": "/" + page.replace(/\s+/g,"-")}
                      className={({isActive}) => 
                        isActive ? activeClassName : inactiveClassName
                      }
                  >
                    <MenuItem 
                      key={page} 
                      sx={{
                        backgroundColor: "#212121", 
                        color: "white",
                        '&:hover': {
                          backgroundColor: '#b3b3b3',
                          color: '#212121'
                        }
                      }} 
                      onClick={handleCloseNavMenu}>
                      <Typography textAlign="center" variant="button">{page}</Typography>
                    </MenuItem>
                  </NavLink>
                ))}
              </Menu>
          </Box>
          <EqualizerIcon sx={{color: "#1ed760", display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Spotify Song Stats
          </Typography>
          <Box sx={{flexGrow: 1, justifyContent: 'flex-end', display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <NavLink 
                to={page === "search" ? "/": "/" + page.replace(/\s+/g,"-")}
                className={({isActive}) => 
                  isActive ? activeClassName : inactiveClassName
                }
              >
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2, 
                    color: 'white', 
                    display: 'block', 
                    fontWeight: 'inherit',
                    '&:hover': {
                      backgroundColor: '#b3b3b3',
                      color: '#121212'
                    }
                  }}
                >
                  {page}
                </Button>
              </NavLink>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;