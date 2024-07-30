import React, { useEffect, useState } from 'react';
import {
    Box, CircularProgress, List, ListItem, ListItemText, Paper,  Container, Typography, Button, ListItemIcon,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function SingleCohort({ cohortId, setCurrentTab, setCurrentStudentId }) {
    const [cohort, setCohort] = useState({});
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(`http://127.0.0.1:8000/api/cohort/${cohortId}/`)
            .then(res => res.json())
            .then(data => {
                setCohort(data);
                return fetch(`http://127.0.0.1:8000/api/student/?cohort=${cohortId}`);
            })
            .then(res => res.json())
            .then(data => {
                setStudents(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching students or cohort:", error);
                setError(error.toString());
                setLoading(false);
            });
    }, [cohortId]);

    const handleViewStudentDetails = (studentId) => {
        setCurrentStudentId(studentId);
        setCurrentTab('ViewStudents');
    };
    

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
    if (error) return <Typography variant="body1" color="error" sx={{ mt: 2, textAlign: 'center', fontFamily: 'Roboto' }}>{error}</Typography>;

    return (
        <Container maxWidth={false} sx={{ mt: 8, p: 0 }}>
            <Paper elevation={3} sx={{ width: '90%', p: 4, backgroundColor: '#fff', margin: '0 auto', boxShadow: 'none' }}>
                <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: 'black', mb: 4, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2rem', fontFamily: 'Roboto' }}>
                    Cohort: {cohort?.name}
                </Typography>
                <Button
                    startIcon={<ArrowBackIcon />}
                    variant="outlined"
                    onClick={() => setCurrentTab('ViewCohorts')}
                    sx={{ mb: 3, textTransform: 'none', fontFamily: 'Roboto' }}
                >
                    Back to Cohorts
                </Button>
                <Button
                    endIcon={<ArrowForwardIcon />}
                    variant="outlined"
                    onClick={() => setCurrentTab('ModuleListForCohort')}
                    sx={{ mb: 3, ml: 90, textTransform: 'none', fontFamily: 'Roboto' }}
                >
                    View Modules
                </Button>
                <List sx={{fontFamily: 'Roboto'}}>
                    {students.map(student => (
                        <ListItem key={student.student_id} divider sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Roboto' }}>
                            <ListItemIcon>
                                <SchoolIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                                primary={`${student.first_name} ${student.last_name}`}
                                secondary={`ID: ${student.student_id} - Email: ${student.email}`}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<VisibilityIcon />}
                                onClick={() => handleViewStudentDetails(student.student_id)}
                            >
                                View Details
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
}

export default SingleCohort;
