import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import api from '../../services/api';

const MealPlanGenerator = () => {
  const [formData, setFormData] = useState({
    calories: '',
    dietType: '',
    duration: 7
  });
  const [mealPlan, setMealPlan] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/meal-plans/generate', formData);
      setMealPlan(response.data);
    } catch (error) {
      console.error('Error generating meal plan:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Generate Meal Plan
      </Typography>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 500 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Daily Calories"
            name="calories"
            type="number"
            value={formData.calories}
            onChange={handleChange}
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Diet Type</InputLabel>
            <Select
              name="dietType"
              value={formData.dietType}
              onChange={handleChange}
              required
            >
              <MenuItem value="balanced">Balanced</MenuItem>
              <MenuItem value="vegetarian">Vegetarian</MenuItem>
              <MenuItem value="vegan">Vegan</MenuItem>
              <MenuItem value="keto">Keto</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Duration (days)"
            name="duration"
            type="number"
            value={formData.duration}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
          >
            Generate Meal Plan
          </Button>
        </form>
      </Paper>
      {mealPlan && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Your Meal Plan
          </Typography>
          {/* Display meal plan details here */}
          <Typography>Meal plan generated successfully!</Typography>
        </Box>
      )}
    </Box>
  );
};

export default MealPlanGenerator;
