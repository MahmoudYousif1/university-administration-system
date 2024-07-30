import React, { useState, useEffect } from 'react';
import {
  Container, Typography, TextField, Button, Paper, Select,
  MenuItem, InputLabel, FormControl, Alert
} from "@mui/material";
import axios from 'axios';
import HomeIcon from '@mui/icons-material/Home';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function CreateCohort({ setCurrentTab }) {
  const [degrees, setDegrees] = useState([]);
  const [selectedDegree, setSelectedDegree] = useState('');
  const [cohortName, setCohortName] = useState('');
  const [cohortId, setCohortId] = useState('');
  const [cohortYear, setCohortYear] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/degree/')
      .then(response => {
        const degreesWithUrl = response.data.map(degree => ({
          ...degree,
          url: `http://127.0.0.1:8000/api/degree/${degree.shortcode}/`
        }));
        setDegrees(degreesWithUrl);
      })
      .catch(error => {
        console.error('Error fetching degrees:', error);
        setError('Failed to fetch degrees');
      });
  }, []);

  const handleDegreeChange = (event) => {
    setSelectedDegree(event.target.value);
  };

  const handleCohortNameChange = (event) => {
    setCohortName(event.target.value);
  };

  const handleCohortIdChange = (event) => {
    setCohortId(event.target.value.toUpperCase()); // Cohort IDs may need to be uppercase
  };

  const handleCohortYearChange = (event) => {
    setCohortYear(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cohortData = {
      id: cohortId,
      name: cohortName,
      year: parseInt(cohortYear, 10), // Convert year to an integer
      degree: degrees.find(d => d.shortcode === selectedDegree)?.url // Match selected degree to its URL
    };

    if (!cohortData.degree) {
      setError("Please select a valid degree.");
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/cohort/', cohortData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setCurrentTab('ViewCohorts');
    } catch (error) {
      setError(error.response?.data?.detail || error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 10, backgroundColor: '#fff' }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 2, color: 'black', fontWeight: '800', textTransform: 'uppercase' }}>
          Create New Cohort
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="cohortId"
            label="Cohort ID"
            name="cohortId"
            value={cohortId}
            onChange={handleCohortIdChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="cohortName"
            label="Cohort Name"
            name="cohortName"
            value={cohortName}
            onChange={handleCohortNameChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="cohortYear"
            label="Cohort Year"
            name="cohortYear"
            type="number"
            value={cohortYear}
            onChange={handleCohortYearChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="degree-select-label">Degree</InputLabel>
            <Select
              labelId="degree-select-label"
              id="degree-select"
              value={selectedDegree}
              label="Degree"
              onChange={handleDegreeChange}
            >
              {degrees.map((degree) => (
                <MenuItem key={degree.shortcode} value={degree.shortcode}>
                  {degree.full_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{ mt: 3, mb: 2 }}
          >
            Create Cohort
          </Button>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            fullWidth
            onClick={() => setCurrentTab('ViewCohorts')}
            sx={{ mt: 2 }}
          >
            View Cohorts
          </Button>
          <Button
            variant="outlined"
            startIcon={<HomeIcon />}
            fullWidth
            onClick={() => setCurrentTab('Homepage')}
            sx={{ mt: 2 }}
          >
            Go Home
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default CreateCohort;
