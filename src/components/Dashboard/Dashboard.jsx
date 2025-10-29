import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
  Avatar
} from '@mui/material';
import {
  Restaurant,
  LocalDrink,
  MonitorWeight,
  Favorite,
  TrendingUp
} from '@mui/icons-material';
import api from '../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    todayMeals: 0,
    waterIntake: 0,
    weight: 0,
    favorites: 0,
    bmi: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch user's daily tracking data
      const trackingResponse = await api.get('/tracking/today');
      const favoritesResponse = await api.get('/favorites');

      setStats({
        todayMeals: trackingResponse.data.mealLogs?.length || 0,
        waterIntake: trackingResponse.data.waterLogs?.reduce((sum, log) => sum + log.amount, 0) || 0,
        weight: trackingResponse.data.weightLogs?.[0]?.weight || 0,
        favorites: favoritesResponse.data.length || 0,
        bmi: 0
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getBmiCategory = (bmi) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'warning' };
    if (bmi < 25) return { label: 'Normal', color: 'success' };
    if (bmi < 30) return { label: 'Overweight', color: 'warning' };
    return { label: 'Obese', color: 'error' };
  };

  const bmiCategory = getBmiCategory(stats.bmi);

  const statCards = [
    {
      title: 'Today\'s Meals',
      value: stats.todayMeals,
      icon: <Restaurant color="primary" />,
      subtitle: 'Meals logged today'
    },
    {
      title: 'Water Intake',
      value: `${stats.waterIntake}ml`,
      icon: <LocalDrink color="primary" />,
      subtitle: 'Daily goal: 2000ml'
    },
    {
      title: 'Current Weight',
      value: `${stats.weight}kg`,
      icon: <MonitorWeight color="primary" />,
      subtitle: 'Track your progress'
    },
    {
      title: 'Favorites',
      value: stats.favorites,
      icon: <Favorite color="primary" />,
      subtitle: 'Saved recipes'
    }
  ];

  if (loading) {
    return (
      <Box sx={{ width: '100%', mt: 2 }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Hyno Nutrition!
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      {card.title}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {card.value}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {card.subtitle}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {card.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* BMI Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                BMI Status
              </Typography>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" component="div">
                    {stats.bmi.toFixed(1)}
                  </Typography>
                  <Chip
                    label={bmiCategory.label}
                    color={bmiCategory.color}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Box>
                <TrendingUp color="action" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography variant="body2" color="textSecondary">
                  • Log your meals for today
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  • Track your water intake
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  • Browse healthy recipes
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  • Generate a meal plan
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
