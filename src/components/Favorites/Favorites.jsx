import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button, Box, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await api.get('/favorites');
      setFavorites(response.data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const toggleFavorite = async (recipeId) => {
    try {
      await api.post(`/favorites/${recipeId}`);
      fetchFavorites(); // Refresh the list
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        My Favorite Recipes
      </Typography>
      {favorites.length === 0 ? (
        <Typography>No favorite recipes yet. Start exploring recipes!</Typography>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Typography variant="h6" component="h2">
                      {recipe.name}
                    </Typography>
                    <IconButton onClick={() => toggleFavorite(recipe.id)}>
                      <Favorite color="error" />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {recipe.description}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/recipes/${recipe.id}`}
                    variant="outlined"
                    sx={{ mt: 2 }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Favorites;
