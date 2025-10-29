import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button, TextField, Box, Chip, CircularProgress, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { Restaurant, AccessTime, People } from '@mui/icons-material';
import api from '../../services/api';

const RecipeBrowser = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    filterRecipes();
  }, [recipes, searchTerm]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await api.get('/recipes');
      setRecipes(response.data.content || response.data); // Handle pagination
      setError('');
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError('Failed to load recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filterRecipes = () => {
    if (!searchTerm) {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.cuisineType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.mealType?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRecipes(filtered);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Recipe Browser
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Discover healthy recipes tailored for various health conditions
      </Typography>

      <TextField
        fullWidth
        label="Search Recipes"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        margin="normal"
        placeholder="Search by name, cuisine, or meal type..."
      />

      {filteredRecipes.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No recipes found matching your search.
          </Typography>
        </Box>
      ) : (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Showing {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''}
          </Typography>

          <Grid container spacing={3}>
            {filteredRecipes.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {recipe.name}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Chip
                        label={recipe.mealType}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Chip
                        label={recipe.cuisineType}
                        size="small"
                        color="secondary"
                        variant="outlined"
                      />
                      {recipe.isVegetarian && (
                        <Chip
                          label="Vegetarian"
                          size="small"
                          color="success"
                          variant="outlined"
                        />
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Restaurant fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {recipe.calories} cal
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <People fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {recipe.protein}g protein
                        </Typography>
                      </Box>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {recipe.description || 'A healthy recipe for better nutrition.'}
                    </Typography>

                    <Button
                      component={Link}
                      to={`/recipes/${recipe.id}`}
                      variant="contained"
                      fullWidth
                    >
                      View Recipe
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default RecipeBrowser;
