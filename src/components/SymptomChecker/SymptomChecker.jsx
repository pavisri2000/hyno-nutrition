import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box, Chip, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import api from '../../services/api';

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [results, setResults] = useState(null);

  const commonSymptoms = [
    'Headache', 'Nausea', 'Fatigue', 'Dizziness', 'Stomach pain',
    'Bloating', 'Constipation', 'Diarrhea', 'Heartburn', 'Loss of appetite'
  ];

  const handleSymptomSelect = (symptom) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleSymptomRemove = (symptomToRemove) => {
    setSelectedSymptoms(selectedSymptoms.filter(symptom => symptom !== symptomToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/symptom-checker', { symptoms: selectedSymptoms });
      setResults(response.data);
    } catch (error) {
      console.error('Error checking symptoms:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Symptom Checker
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Select your symptoms:
        </Typography>
        <Box sx={{ mb: 2 }}>
          {commonSymptoms.map((symptom) => (
            <Chip
              key={symptom}
              label={symptom}
              onClick={() => handleSymptomSelect(symptom)}
              sx={{ m: 0.5 }}
              clickable
            />
          ))}
        </Box>
        <Box sx={{ mb: 2 }}>
          {selectedSymptoms.map((symptom) => (
            <Chip
              key={symptom}
              label={symptom}
              onDelete={() => handleSymptomRemove(symptom)}
              color="primary"
              sx={{ m: 0.5 }}
            />
          ))}
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Or describe your symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            margin="normal"
            multiline
            rows={3}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
            disabled={selectedSymptoms.length === 0 && !symptoms.trim()}
          >
            Check Symptoms
          </Button>
        </form>
      </Paper>
      {results && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Possible Causes
          </Typography>
          {results.possibleCauses.map((cause, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="h6">{cause.condition}</Typography>
              <Typography variant="body2" color="text.secondary">
                Likelihood: {cause.likelihood}
              </Typography>
              <Typography variant="body2">
                Recommendations: {cause.recommendations}
              </Typography>
            </Box>
          ))}
          <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
            Note: This is not a substitute for professional medical advice. Please consult a healthcare provider for proper diagnosis.
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default SymptomChecker;
