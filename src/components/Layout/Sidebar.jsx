import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Close } from '@mui/icons-material';
import {
  Dashboard,
  Restaurant,
  CalendarToday,
  TrackChanges,
  Analytics,
  Favorite,
  Healing,
  Person
} from '@mui/icons-material';

const Sidebar = ({ open, onClose }) => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/' },
    { text: 'Recipes', icon: <Restaurant />, path: '/recipes' },
    { text: 'Meal Plan', icon: <CalendarToday />, path: '/meal-plan' },
    { text: 'Daily Tracking', icon: <TrackChanges />, path: '/tracking' },
    { text: 'Analytics', icon: <Analytics />, path: '/analytics' },
    { text: 'Favorites', icon: <Favorite />, path: '/favorites' },
    { text: 'Symptom Checker', icon: <Healing />, path: '/symptom-checker' },
    { text: 'Profile', icon: <Person />, path: '/profile' },
  ];

  const drawerContent = (
    <Box sx={{
      width: isMobile ? 280 : 240,
      height: '100%',
      bgcolor: '#272526', // Deep gray/off-black background
      color: '#e5e5e5', // Light gray text
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <Box sx={{
        p: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Typography variant="h6" sx={{
          fontWeight: 700,
          fontSize: '1.25rem',
          color: '#ffffff'
        }}>
          Hyno Nutrition
        </Typography>
        {isMobile && (
          <IconButton onClick={onClose} sx={{ color: '#e5e5e5' }}>
            <Close />
          </IconButton>
        )}
      </Box>

      {/* Navigation Menu */}
      <List sx={{ pt: 2, px: 1, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              sx={{
                mb: 0.5,
                borderRadius: 2,
                position: 'relative',
                color: isSelected ? '#ffffff' : '#e5e5e5',
                '&:hover': {
                  bgcolor: 'rgba(37, 99, 235, 0.1)',
                  color: '#ffffff',
                },
                ...(isSelected && {
                  bgcolor: 'rgba(37, 99, 235, 0.15)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 4,
                    height: '60%',
                    bgcolor: '#2563eb', // Blue accent bar
                    borderRadius: '0 2px 2px 0',
                  },
                }),
              }}
            >
              <ListItemIcon sx={{
                color: 'inherit',
                minWidth: 40,
                '& .MuiSvgIcon-root': {
                  fontSize: '1.25rem',
                }
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: isSelected ? 600 : 400,
                }}
              />
            </ListItem>
          );
        })}
      </List>

      {/* Footer */}
      <Box sx={{
        p: 2,
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: 'center'
      }}>
        <Typography variant="caption" sx={{
          color: 'rgba(229, 229, 229, 0.7)',
          fontSize: '0.75rem'
        }}>
          © 2024 Hyno Nutrition
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            boxShadow: '4px 0 8px rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
            borderRight: 'none',
            boxShadow: '2px 0 4px rgba(0, 0, 0, 0.1)',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
