import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [appState, setAppState] = useState({
    currentMealPlan: null,
    favoriteRecipes: [],
    recentRecipes: [],
    notifications: []
  });

  const updateMealPlan = (mealPlan) => {
    setAppState(prev => ({
      ...prev,
      currentMealPlan: mealPlan
    }));
  };

  const addFavoriteRecipe = (recipe) => {
    setAppState(prev => ({
      ...prev,
      favoriteRecipes: [...prev.favoriteRecipes, recipe]
    }));
  };

  const removeFavoriteRecipe = (recipeId) => {
    setAppState(prev => ({
      ...prev,
      favoriteRecipes: prev.favoriteRecipes.filter(recipe => recipe.id !== recipeId)
    }));
  };

  const addRecentRecipe = (recipe) => {
    setAppState(prev => ({
      ...prev,
      recentRecipes: [recipe, ...prev.recentRecipes.slice(0, 4)] // Keep only 5 recent recipes
    }));
  };

  const addNotification = (notification) => {
    setAppState(prev => ({
      ...prev,
      notifications: [notification, ...prev.notifications]
    }));
  };

  const clearNotifications = () => {
    setAppState(prev => ({
      ...prev,
      notifications: []
    }));
  };

  const value = {
    ...appState,
    updateMealPlan,
    addFavoriteRecipe,
    removeFavoriteRecipe,
    addRecentRecipe,
    addNotification,
    clearNotifications
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
