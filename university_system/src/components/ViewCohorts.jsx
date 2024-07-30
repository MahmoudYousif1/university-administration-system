import React, { useState, useEffect } from 'react';
import {
    CircularProgress, List, ListItem, ListItemText, Typography, Container, Paper, ListItemIcon, Button,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function ViewCohorts({ setCurrentTab, setSelectedCohortId }) {
    const [cohorts, setCohorts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/cohort/')
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
                console.error('Fetch error:', error);
                setError(error.toString());
                setLoading(false);
            });
    }, []);

    const handleCohortClick = (cohortId) => {
        setSelectedCohortId(cohortId);
        setCurrentTab('SingleCohort');
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography variant="body1" color="error" fontFamily="Roboto">{error}</Typography>;
    }

    return (
        <Container maxWidth={false} sx={{ mt: 8, p: 0 }}>
            <Paper elevation={3} sx={{ width: '90%', p: 4, backgroundColor: '#fff', margin: '0 auto', boxShadow: 'none' }}>
                <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: 'black', mb: 4, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2rem', fontFamily: 'Roboto' }}>
                    Cohorts
                </Typography>

                <Typography>
                    <Typography variant="h6" color="black" fontWeight={'300'} sx={{ textAlign: 'center', color: 'black', mb: 4, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1rem', fontFamily: 'Roboto' }}>Click on a Cohort to view its modules & student details</Typography>
                </Typography>
                <Button
                    startIcon={<ArrowBackIcon />}
                    variant="outlined"
                    onClick={() => setCurrentTab('Degrees')}
                    sx={{ mb: 3, textTransform: 'none', fontFamily: 'Roboto' }}
                >
                    Back to Degrees
                </Button>
                <Button
                    endIcon={<ArrowForwardIcon />}
                    variant="outlined"
                    onClick={() => setCurrentTab('ViewModules')}
                    sx={{ mb: 3, ml: 90, textTransform: 'none', fontFamily: 'Roboto' }}
                >
                    View Modules
                </Button>
                <List>
                    {cohorts.map(cohort => (
                        <ListItem button key={cohort.id} onClick={() => handleCohortClick(cohort.id)} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <ListItemIcon>
                                <SchoolIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                                primary={<Typography variant="h6" color="black" fontWeight={'800'} fontFamily="Roboto">{cohort.name}</Typography>}
                                secondary={<Typography color="text.secondary" sx={{ fontSize: '1rem' }} fontFamily="Roboto">Year: {cohort.year}</Typography>}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
}

export default ViewCohorts;
