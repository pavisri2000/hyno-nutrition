import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, List, ListItem, ListItemText, Button } from '@mui/material';
import api from '../../services/api';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const response = await api.get(`/recipes/${id}`);
      setRecipe(response.data);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  };

  if (!recipe) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {recipe.name}
      </Typography>
      <Typography variant="body1" paragraph>
        {recipe.description}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Ingredients:
      </Typography>
      <List>
        {recipe.ingredients.map((ingredient, index) => (
          <ListItem key={index}>
            <ListItemText primary={ingredient} />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" gutterBottom>
        Instructions:
      </Typography>
      <Typography variant="body1" paragraph>
        {recipe.instructions}
      </Typography>
      <Button variant="contained" onClick={() => window.history.back()}>
        Back to Recipes
      </Button>
    </Box>
  );
};

export default RecipeDetail;
