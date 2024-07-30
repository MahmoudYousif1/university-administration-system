import React, { useState, useEffect } from 'react';
import {
    Box, CircularProgress, List, ListItem, ListItemText, Paper, Container, Typography, Button, ListItemIcon,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SchoolIcon from '@mui/icons-material/School';

const ModuleListForCohort = ({ cohortId, setCurrentTab }) => { // Add setCurrentTab as a prop
    const [modules, setModules] = useState([]); // Change the state variable name to modules
    const [isLoading, setIsLoading] = useState(true); // Change the state variable name to isLoading
    const [error, setError] = useState(null); // Change the state variable name to error

    useEffect(() => {
        const fetchModules = async () => {  
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${cohortId}`); // Fetch modules for the cohort
                if (!response.ok) { 
                    throw new Error('Network response was not ok');
                }
                const data = await response.json(); // Parse the response JSON
                setModules(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchModules(); 
    }, [cohortId]);   // Fetch modules when cohortId changes

    if (isLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
        </Box>;
    }

    if (error) {
        return <Typography variant="body1" color="error" sx={{ mt: 2, textAlign: 'center' }}>{error}</Typography>;
    }

    return (
        <Container maxWidth={false} sx={{ mt: 8, p: 0 }}>
            <Paper elevation={3} sx={{ width: '90%', p: 4, backgroundColor: '#fff', margin: '0 auto', boxShadow: 'none' }}>
                <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: 'black', mb: 4, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2rem' }}>
                    Modules for Cohort {cohortId}
                </Typography>
                <Button
                    startIcon={<ArrowBackIcon />}
                    variant="outlined"
                    onClick={() => setCurrentTab('SingleCohort')}
                    sx={{ mb: 3, textTransform: 'none' }}
                >
                    Back to Cohort
                </Button>
                <List>
                    {modules.length > 0 ? modules.map((module) => (
                        <ListItem key={module.code} divider sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <ListItemIcon>
                                <SchoolIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                                primary={<Typography variant="h6" color="black" fontWeight={'800'}>{module.full_name}</Typography>}
                                secondary={<Typography color="text.secondary" sx={{ fontSize: '1rem' }}>Code: {module.code}</Typography>}
                            />
                        </ListItem>
                    )) : (
                        <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>No modules found for this cohort.</Typography>
                    )}
                </List>
            </Paper>
        </Container>
    );
};

export default ModuleListForCohort;
