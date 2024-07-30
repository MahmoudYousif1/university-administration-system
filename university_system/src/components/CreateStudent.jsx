import React, { useState, useEffect } from 'react';
import {
  Container, Typography, TextField, Button, Paper, FormControl, InputLabel, Select, MenuItem, Alert,
} from '@mui/material';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function CreateStudent({ setCurrentTab }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCohort, setSelectedCohort] = useState('');
  const [cohorts, setCohorts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/cohort/')
      .then(response => setCohorts(response.data))
      .catch(error => console.error('Error fetching cohorts:', error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const studentData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      cohort: `http://127.0.0.1:8000/api/cohort/${selectedCohort}/`,
    };

    try {
      await axios.post('http://127.0.0.1:8000/api/student/', studentData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setCurrentTab('ViewCohorts');
    } catch (error) {
      setError(error.response?.data || "An unknown error occurred");
    }
  };

  const handleCohortChange = (event) => {
    setSelectedCohort(event.target.value);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 10, backgroundColor: '#fff' }}>
        <Typography variant="h4" gutterBottom>Create New Student</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="select-cohort-label">Cohort</InputLabel>
            <Select
              labelId="select-cohort-label"
              id="select-cohort"
              value={selectedCohort}
              label="Cohort"
              onChange={handleCohortChange}
            >
              {cohorts.map((cohort) => (
                <MenuItem key={cohort.id} value={cohort.id}>
                  {cohort.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            startIcon={<SaveIcon />}
          >
            Create Student
          </Button>
          <Button
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            fullWidth
            onClick={() => setCurrentTab('Homepage')}
            sx={{ mt: 2, textTransform: 'none' }}
          >
            Back to Homepage
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default CreateStudent;
