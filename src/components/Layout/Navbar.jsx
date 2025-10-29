import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, useMediaQuery, useTheme } from '@mui/material';
import { Menu, Notifications } from '@mui/icons-material';

const Navbar = ({ onMenuClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#ffffff',
        color: '#111827',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <Toolbar sx={{ minHeight: 64 }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{
            mr: 2,
            color: '#6b7280',
            '&:hover': {
              backgroundColor: 'rgba(37, 99, 235, 0.04)',
            }
          }}
        >
          <Menu />
        </IconButton>

        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
            fontSize: isMobile ? '1.125rem' : '1.25rem',
            color: '#111827'
          }}
        >
          {isMobile ? 'Hyno' : 'Hyno Nutrition Dashboard'}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            color="inherit"
            sx={{
              color: '#6b7280',
              '&:hover': {
                backgroundColor: 'rgba(37, 99, 235, 0.04)',
              }
            }}
          >
            <Notifications />
          </IconButton>


        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
