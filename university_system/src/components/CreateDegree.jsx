import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper, Alert} from "@mui/material";
import axios from 'axios';
import HomeIcon from '@mui/icons-material/Home';
import SaveIcon from '@mui/icons-material/Save';


function CreateDegree({ setCurrentTab }) {
    const [degreeData, setDegreeData] = useState({
        full_name: '',
        shortcode: '',
    });
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDegreeData({
            ...degreeData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/degree/', degreeData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
            setCurrentTab('Degrees');
        } catch (error) {
            setError(error.response?.data?.detail || error.message);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 17, backgroundColor: '#fff' }}>
                <Typography variant="h4" gutterBottom sx={{ mb: 2, color: 'black', fontWeight: '800', textTransform: 'uppercase', fontFamily: 'Roboto' }}>
                    Create New Degree
                </Typography>
                {error && <Alert severity="error" sx={{ fontFamily: 'Roboto' }}>{error}</Alert>}
                <form onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="full_name"
                        label="Full Name"
                        name="full_name"
                        autoFocus
                        value={degreeData.full_name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="shortcode"
                        label="Short Code"
                        name="shortcode"
                        value={degreeData.shortcode}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        startIcon={<SaveIcon />}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Create Degree
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<HomeIcon />}
                        fullWidth
                        onClick={() => setCurrentTab('Degrees')}
                        sx={{ mt: 2 }}
                    >
                        View Degrees
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<HomeIcon />}
                        fullWidth
                        onClick={() => setCurrentTab('Homepage')}
                        sx={{ mt: 3 }}
                    >
                        Go Home
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default CreateDegree;
