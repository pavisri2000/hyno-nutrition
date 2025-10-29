import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper, Grid } from '@mui/material';
import { Line } from 'react-chartjs-2';
import api from '../../services/api';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await api.get('/analytics');
      setAnalyticsData(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  if (!analyticsData) {
    return <Typography>Loading analytics...</Typography>;
  }

  const weightData = {
    labels: analyticsData.weightHistory.map(d => d.date),
    datasets: [{
      label: 'Weight (kg)',
      data: analyticsData.weightHistory.map(d => d.weight),
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const caloriesData = {
    labels: analyticsData.caloriesHistory.map(d => d.date),
    datasets: [{
      label: 'Calories Consumed',
      data: analyticsData.caloriesHistory.map(d => d.calories),
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1
    }]
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Analytics
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Weight Progress
            </Typography>
            <Line data={weightData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Calorie Intake
            </Typography>
            <Line data={caloriesData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Average Daily Calories</Typography>
            <Typography variant="h4">{analyticsData.averageCalories}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Exercise Minutes</Typography>
            <Typography variant="h4">{analyticsData.totalExerciseMinutes}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Weight Change</Typography>
            <Typography variant="h4">{analyticsData.weightChange} kg</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
