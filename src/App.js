import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import RecipeBrowser from './components/Recipes/RecipeBrowser';
import RecipeDetail from './components/Recipes/RecipeDetail';
import MealPlanGenerator from './components/MealPlan/MealPlanGenerator';
import MealPlanViewer from './components/MealPlan/MealPlanViewer';
import DailyTracking from './components/Tracking/DailyTracking';
import Analytics from './components/Analytics/Analytics';
import Favorites from './components/Favorites/Favorites';
import SymptomChecker from './components/SymptomChecker/SymptomChecker';
import Profile from './components/Profile/Profile';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // Perplexity blue
    },
    secondary: {
      main: '#6b7280', // Muted gray
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#111827', // Dark gray for headlines
      secondary: '#6b7280', // Light gray for body text
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
    },
    body2: {
      fontWeight: 400,
      fontSize: '0.875rem',
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12, // Rounded corners
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          fontWeight: 500,
        },
        contained: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

// App Content component
function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuClick={handleSidebarToggle} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/recipes" element={<RecipeBrowser />} />
            <Route path="/recipes/:id" element={<RecipeDetail />} />
            <Route path="/meal-plan" element={<MealPlanGenerator />} />
            <Route path="/meal-plan/view" element={<MealPlanViewer />} />
            <Route path="/tracking" element={<DailyTracking />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/symptom-checker" element={<SymptomChecker />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppProvider>
          <Router>
            <AppContent />
          </Router>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
