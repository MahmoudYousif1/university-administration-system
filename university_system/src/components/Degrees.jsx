import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography, List, ListItem, ListItemText, Paper, Button, ListItemIcon, Container } from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Degrees({ setCurrentTab, setDegreeCode }) {
  const [degrees, setDegrees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.body.style.backgroundColor = 'white';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/degree")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setDegrees(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Fetch error:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" flexDirection="column">
        <Typography variant="h5" color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: 'white', boxShadow: 'none' }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: 'black', mb: 4, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2rem', fontFamily: 'Roboto' }}>
          Degrees
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            onClick={() => setCurrentTab('Homepage')}
            sx={{ textTransform: 'none', color: 'black', borderColor: 'black', fontFamily: 'Roboto' }}
          >
            Home
          </Button>
          <Button
            endIcon={<ArrowForwardIcon />}
            variant="outlined"
            onClick={() => setCurrentTab('ViewCohorts')}
            sx={{ textTransform: 'none', color: 'black', borderColor: 'black' }}
          >
            View Cohorts
          </Button>
        </Box>

        <List>
          {degrees.map((degree, index) => (
            <ListItem key={index} divider sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <ListItemIcon>
                <SchoolIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6" color="black" fontWeight="800" fontFamily={"Roboto"}>{degree.full_name}</Typography>}
                secondary={<Typography color="black" fontFamily={"Roboto"} sx={{ fontSize: '1rem' }}>ShortCode: {degree.shortcode}</Typography>}
              />
              <Button
                variant="contained"
                startIcon={<ArrowForwardIcon />}
                onClick={() => {
                  setDegreeCode(degree.shortcode);
                  setCurrentTab('Single Degree');
                }}
                sx={{ ml: 2, fontSize: '0.5rem', textTransform: 'uppercase' }}
              >
                View Degree
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default Degrees;