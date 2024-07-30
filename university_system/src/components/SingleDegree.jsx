import React, { useState, useEffect } from 'react';
import {
  Box, CircularProgress, Typography, List, ListItem, ListItemText, Paper, Container, Chip, Button, ListItemIcon,
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SchoolIcon from '@mui/icons-material/School';


function SingleDegree({ degreeCode, setCurrentTab }) {
  const [cohorts, setCohorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    document.body.style.backgroundColor = 'white';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);


  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/cohort/?degree=${degreeCode}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCohorts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Fetch error:", error);
        setError(error.toString());
        setLoading(false);
      });
  }, [degreeCode]);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress /></Box>;
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', mt: 4 }}>
        <Typography color="error" sx={{ textAlign: 'center', fontFamily: 'Roboto' }}>Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth={false} sx={{ mt: 8, p: 0 }}>
      <Paper elevation={3} sx={{ width: '90%', p: 4, backgroundColor: 'white', margin: '0 auto', boxShadow: 'none' }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: 'center',
            color: 'black',
            mb: 4,
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.2rem',
            fontFamily: 'Roboto'
          }}
        >
          Cohorts for {degreeCode}
        </Typography>
        <List>
          {cohorts.map((cohort, index) => (
            <ListItem
              key={cohort.id}
              divider
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <ListItemIcon>
                <SchoolIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6" color="black" fontWeight={'800'} fontFamily="Roboto">{cohort.name}</Typography>}
                secondary={<Typography color="black" sx={{ fontSize: '1rem' }} fontFamily="Roboto">Year: {cohort.year} — ID: {cohort.id}</Typography>}
              />
              <Chip label={`Year ${cohort.year}`} color="primary" variant="outlined" />
            </ListItem>
          ))}
        </List>
        <Button
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          onClick={() => setCurrentTab('Degrees')}
          sx={{
            mt: 4,
            display: 'flex',
            textTransform: 'none',
            color: 'black',
            fontFamily: 'Roboto'
          }}
        >
          Back to Degrees
        </Button>
      </Paper>
    </Container>
  );
}

export default SingleDegree;
