import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, CircularProgress, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function SingleModule({ moduleCode, setCurrentTab }) {
    const [module, setModule] = useState(null); // State to store the module data
    const [loading, setLoading] = useState(true); // State to track loading state
    const [error, setError] = useState(null); // State to track error state

    useEffect(() => {
        if (!moduleCode) {
            setError('Module code is not provided'); // Set error message if module code is not provided
            setLoading(false);
            return;
        }

        fetch(`http://127.0.0.1:8000/api/module/${moduleCode}`) // Fetch module data
            .then(response => response.json()) // Parse response JSON
            .then(data => {
                setModule(data); // Set module data
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch module data", error);
                setError("Failed to fetch module data");
                setLoading(false);
            });
    }, [moduleCode]); // Fetch module data when module code changes

    if (loading) return <CircularProgress />;
    if (error) return <Typography variant="body1" color="error">{error}</Typography>;

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, mt: 15 }}>
                <Typography variant="h4" gutterBottom>
                    Module Details
                </Typography>
                <Typography variant="h6">{module?.full_name} ({module?.code})</Typography>
                <Typography variant="body1">CA Split: {module?.ca_split}%</Typography>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => setCurrentTab('ViewModules')}
                    sx={{ mt: 2 }}
                >
                    Back to Modules
                </Button>
            </Paper>
        </Container>
    );
}

export default SingleModule;
