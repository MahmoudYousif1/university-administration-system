import React, { useState, useEffect } from 'react';
import {
    Container, Typography, TextField, Button, Paper, FormControl, InputLabel, Select, MenuItem, Chip, OutlinedInput, Box, Alert,
} from '@mui/material';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function CreateModules({ setCurrentTab }) {
    const [moduleCode, setModuleCode] = useState(''); // State variable to store the module code
    const [moduleName, setModuleName] = useState(''); // State variable to store the module name
    const [caSplit, setCaSplit] = useState(''); // State variable to store the CA split
    const [selectedCohorts, setSelectedCohorts] = useState([]); // State variable to store the selected cohorts
    const [cohorts, setCohorts] = useState([]); // State variable to store the list of cohorts
    const [error, setError] = useState(null); // State variable to store the error message

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/cohort/') // Fetch the list of cohorts
            .then(response => setCohorts(response.data)) // Set the list of cohorts in state
            .catch(error => console.error('Error fetching cohorts:', error)); 
    }, []);

    const handleSubmit = async (event) => { // Function to handle form submission
        event.preventDefault();
        const deliveredToUris = selectedCohorts.map(id => `http://127.0.0.1:8000/api/cohort/${id}/`); // Create the list of URIs for the selected cohorts

        const moduleData = { // Create the module data object
            code: moduleCode, // Set the module code
            full_name: moduleName, // Set the module name
            ca_split: parseInt(caSplit, 10), // Set the CA split
            delivered_to: deliveredToUris, // Set the list of URIs for the selected cohorts
        };

        try {
            await axios.post('http://127.0.0.1:8000/api/module/', moduleData, { // Send a POST request to create a new module
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setCurrentTab('ViewModules'); // Switch to the ViewModules tab
        } catch (error) {
            setError(error.response?.data || "An unknown error occurred");
        }
    };

    const handleChangeSelectedCohorts = (event) => { // Function to handle changes in the selected cohorts
        const {
            target: { value }, 
        } = event;
        setSelectedCohorts( // Update the selected cohorts
            typeof value === 'string' ? value.split(',') : value, // If the value is a string, split it by commas, otherwise use the value as is
        );
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 10, backgroundColor: '#fff' }}>
                <Typography variant="h4" gutterBottom>Create New Module</Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="moduleCode"
                        label="Module Code"
                        name="moduleCode"
                        value={moduleCode}
                        onChange={(e) => setModuleCode(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="moduleName"
                        label="Module Name"
                        name="moduleName"
                        value={moduleName}
                        onChange={(e) => setModuleName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="caSplit"
                        label="CA Split"
                        name="caSplit"
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 100 } }}
                        value={caSplit}
                        onChange={(e) => setCaSplit(e.target.value)}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="select-cohorts-label">Delivered To Cohorts</InputLabel>
                        <Select
                            labelId="select-cohorts-label"
                            id="select-cohorts"
                            multiple
                            value={selectedCohorts}
                            onChange={handleChangeSelectedCohorts}
                            input={<OutlinedInput id="select-multiple-chip" label="Delivered To Cohorts" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                        >
                            {cohorts.map((cohort) => (
                                <MenuItem
                                    key={cohort.id}
                                    value={cohort.id}
                                >
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
                        Create Module
                    </Button>

                    <Button
                        startIcon={<ArrowBackIcon />}
                        variant="outlined"
                        fullWidth
                        onClick={() => setCurrentTab('ViewModules')}
                        sx={{ mb: 3, mb: 2, textTransform: 'none' }}
                    >
                        Back to Modules
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default CreateModules;
