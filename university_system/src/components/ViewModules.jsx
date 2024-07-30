import React, { useEffect, useState } from 'react';
import {
    Box, CircularProgress, Typography, List, ListItem, ListItemText, Paper,
    Button, Container, ListItemIcon
} from '@mui/material';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HomeIcon from '@mui/icons-material/Home';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function ViewModules({ setCurrentTab, setModuleCode }) {
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/module/')
            .then(response => {
                setModules(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching modules:', error);
                setError('Failed to load modules');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh" flexDirection="column">
                <Typography variant="h5" color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth={false} sx={{ mt: 8, p: 0 }}>
            <Paper elevation={3} sx={{ width: '90%', p: 4, backgroundColor: '#fff', margin: '0 auto', boxShadow: 'none' }}>
                <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: 'black', mb: 4, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2rem' }}>
                    Modules
                </Typography>
                <Button
                    startIcon={<ArrowBackIcon />}
                    variant="outlined"
                    onClick={() => setCurrentTab('ViewCohorts')}
                    sx={{ mb: 3, textTransform: 'none' }}
                >
                    Back to Cohorts
                </Button>
                <Button
                    endIcon={<ArrowForwardIcon />}

                    variant="outlined"
                    onClick={() => setCurrentTab('CreateModules')}
                    sx={{ mb: 5, ml: 85, textTransform: 'none' }}
                >
                    Create Module
                </Button>
                <List>
                    {modules.map((module, index) => (
                        <ListItem key={index} divider sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <ListItemIcon>
                                <ViewModuleIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                                primary={<Typography variant="h6" sx={{ fontWeight: 'bold' }}>{module.full_name}</Typography>}
                                secondary={`Code: ${module.code}`}
                            />
                            <Button
                                variant="contained"
                                startIcon={<VisibilityIcon />}
                                onClick={() => {
                                    setCurrentTab('SingleModule');
                                    setModuleCode(module.code);
                                }}
                                sx={{ ml: 2 }}
                            >
                                View Details
                            </Button>


                        </ListItem>
                    ))}
                </List>
                <Button
                    startIcon={<HomeIcon />}
                    variant="outlined"
                    onClick={() => setCurrentTab('Homepage')}
                    sx={{ mt: 2, display: 'flex', textTransform: 'none' }}
                >
                    Home
                </Button>
            </Paper>
        </Container>
    );
}

export default ViewModules;
