import React, { useState, useEffect } from 'react';
import { Typography, Box, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';
import api from '../../services/api';

const MealPlanViewer = () => {
  const [mealPlan, setMealPlan] = useState(null);

  useEffect(() => {
    fetchMealPlan();
  }, []);

  const fetchMealPlan = async () => {
    try {
      const response = await api.get('/meal-plans/current');
      setMealPlan(response.data);
    } catch (error) {
      console.error('Error fetching meal plan:', error);
    }
  };

  if (!mealPlan) {
    return <Typography>Loading your meal plan...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Meal Plan
      </Typography>
      {mealPlan.days.map((day, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Day {index + 1}
            </Typography>
            <List>
              {day.meals.map((meal, mealIndex) => (
                <ListItem key={mealIndex}>
                  <ListItemText
                    primary={`${meal.type}: ${meal.recipe.name}`}
                    secondary={`Calories: ${meal.calories}`}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default MealPlanViewer;
