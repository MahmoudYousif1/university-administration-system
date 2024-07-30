import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SchoolIcon from '@mui/icons-material/School';

function NavbarHeader({ onChangeTab }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (value) => {
    setAnchorEl(null);
    if (value) {
      onChangeTab(value);
    }
  };

  const handleAboutClick = () => {
    onChangeTab('About');
  };

  const menuItems = [
    { label: "Homepage", value: "Homepage" },
    { label: "Degrees", value: "Degrees" },
    { label: "Create Degree", value: "CreateDegree" },
    { label: "View Cohorts", value: "ViewCohorts" },
    { label: "Create Cohort", value: "CreateCohort" },
    { label: "View Modules", value: "ViewModules" },
    { label: "Create Modules", value: "CreateModules" },
    { label: "Create Student", value: "CreateStudent" },
    { label: "Set Grades", value: "SetGrades" },
    { label: "About", value: "About" },
  ];

  return (
    <AppBar sx={{ background: '#14181f', color: 'whitesmoke', boxShadow: 'none', elevation: 3 }}>
      <Toolbar sx={{ minHeight: '64px', padding: '0 40px', justifyContent: 'space-between' }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', textTransform: 'uppercase', fontFamily: 'Roboto' }}>
          Systema<SchoolIcon sx={{ ml: 1 }} />
        </Typography>
        <Button color="inherit" onClick={handleAboutClick}>About</Button> {/* About link */}
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => handleMenuClose()}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {menuItems.map((item) => (
            <MenuItem key={item.value} onClick={() => handleMenuClose(item.value)}>
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default NavbarHeader;
