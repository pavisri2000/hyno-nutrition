import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography, Box, Grid } from '@mui/material';
import api from '../../services/api';

const DailyTracking = () => {
  const [trackingData, setTrackingData] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: '',
    caloriesConsumed: '',
    waterIntake: '',
    exerciseMinutes: '',
    notes: ''
  });

  useEffect(() => {
    fetchTodayTracking();
  }, []);

  const fetchTodayTracking = async () => {
    try {
      const response = await api.get(`/tracking/${trackingData.date}`);
      if (response.data) {
        setTrackingData(response.data);
      }
    } catch (error) {
      console.error('Error fetching tracking data:', error);
    }
  };

  const handleChange = (e) => {
    setTrackingData({
      ...trackingData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tracking', trackingData);
      alert('Tracking data saved successfully!');
    } catch (error) {
      console.error('Error saving tracking data:', error);
      alert('Error saving tracking data');
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Daily Tracking
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                value={trackingData.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Weight (kg)"
                name="weight"
                type="number"
                value={trackingData.weight}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Calories Consumed"
                name="caloriesConsumed"
                type="number"
                value={trackingData.caloriesConsumed}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Water Intake (ml)"
                name="waterIntake"
                type="number"
                value={trackingData.waterIntake}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Exercise Minutes"
                name="exerciseMinutes"
                type="number"
                value={trackingData.exerciseMinutes}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                name="notes"
                multiline
                rows={4}
                value={trackingData.notes}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3 }}
          >
            Save Tracking Data
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default DailyTracking;
