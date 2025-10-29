import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography, Box, Avatar, Grid } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const Profile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    age: '',
    height: '',
    weight: '',
    activityLevel: '',
    dietaryRestrictions: ''
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username || '',
        email: user.email || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        age: user.age || '',
        height: user.height || '',
        weight: user.weight || '',
        activityLevel: user.activityLevel || '',
        dietaryRestrictions: user.dietaryRestrictions || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/users/profile', profileData);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Profile
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar sx={{ width: 80, height: 80, mr: 2 }}>
            {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h6">
              {profileData.firstName} {profileData.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              @{profileData.username}
            </Typography>
          </Box>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={profileData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={profileData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={profileData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={profileData.age}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Height (cm)"
                name="height"
                type="number"
                value={profileData.height}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Weight (kg)"
                name="weight"
                type="number"
                value={profileData.weight}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Activity Level"
                name="activityLevel"
                value={profileData.activityLevel}
                onChange={handleChange}
                placeholder="e.g., Sedentary, Lightly active, Moderately active"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Dietary Restrictions"
                name="dietaryRestrictions"
                value={profileData.dietaryRestrictions}
                onChange={handleChange}
                placeholder="e.g., Vegetarian, Gluten-free"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3 }}
          >
            Update Profile
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Profile;
