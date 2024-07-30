import React, { useState, useEffect } from 'react';
import {
    Container, Typography, TextField, Button, Paper, FormControl, InputLabel, Select, MenuItem, Alert, Box
} from '@mui/material';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function SetGrades({ setCurrentTab }) {
    const [students, setStudents] = useState([]);
    const [modules, setModules] = useState([]);
    const [cohorts, setCohorts] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedModule, setSelectedModule] = useState('');
    const [selectedCohort, setSelectedCohort] = useState('');
    const [caMark, setCaMark] = useState('');
    const [examMark, setExamMark] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudentsAndModules = async () => {
            try {
                const [studentsRes, modulesRes, cohortsRes] = await Promise.all([
                    axios.get('http://127.0.0.1:8000/api/student/'),
                    axios.get('http://127.0.0.1:8000/api/module/'),
                    axios.get('http://127.0.0.1:8000/api/cohort/')
                ]);
                setStudents(studentsRes.data);
                setModules(modulesRes.data);
                setCohorts(cohortsRes.data);
            } catch (error) {
                setError('Failed to fetch data');
                console.error('Error fetching data:', error);
            }
        };

        fetchStudentsAndModules();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedStudent || !selectedModule || !selectedCohort || caMark === '' || examMark === '') {
            setError('All fields are required.');
            return;
        }

        const calculatedTotalGrade = Number(caMark) + Number(examMark);

        const gradeData = {
            student: `http://127.0.0.1:8000/api/student/${selectedStudent}/`,
            module: `http://127.0.0.1:8000/api/module/${selectedModule}/`,
            cohort: `http://127.0.0.1:8000/api/cohort/${selectedCohort}/`,
            ca_mark: caMark,
            exam_mark: examMark,
            total_grade: calculatedTotalGrade
        };

        try {
            await axios.post('http://127.0.0.1:8000/api/grade/', gradeData, {
                headers: { 'Content-Type': 'application/json' }
            });
            setSelectedStudent('');
            setSelectedModule('');
            setSelectedCohort('');
            setCaMark('');
            setExamMark('');
            setError(null);
        } catch (error) {
            setError('Failed to post grade');
            console.error('Error posting grade:', error.response || error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 10 }}>
                <Typography variant="h4" gutterBottom>Set Student Grade</Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="select-cohort-label">Cohort</InputLabel>
                        <Select
                            labelId="select-cohort-label"
                            id="select-cohort"
                            value={selectedCohort}
                            onChange={e => setSelectedCohort(e.target.value)}
                            label="Cohort"
                        >
                            {cohorts.map((cohort) => (
                                <MenuItem key={cohort.id} value={cohort.id}>
                                    {cohort.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="select-student-label">Student</InputLabel>
                        <Select
                            labelId="select-student-label"
                            id="select-student"
                            value={selectedStudent}
                            onChange={e => setSelectedStudent(e.target.value)}
                            label="Student"
                        >
                            {students.map((student) => (
                                <MenuItem key={student.student_id} value={student.student_id}>
                                    {`${student.first_name} ${student.last_name}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="select-module-label">Module</InputLabel>
                        <Select
                            labelId="select-module-label"
                            id="select-module"
                            value={selectedModule}
                            onChange={e => setSelectedModule(e.target.value)}
                            label="Module"
                        >
                            {modules.map((module) => (
                                <MenuItem key={module.code} value={module.code}>
                                    {module.full_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="caMark"
                        label="CA Mark"
                        name="caMark"
                        value={caMark}
                        onChange={(e) => setCaMark(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="examMark"
                        label="Exam Mark"
                        name="examMark"
                        value={examMark}
                        onChange={(e) => setExamMark(e.target.value)}
                    />
                    <Box sx={{ mt: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<SaveIcon />}
                            sx={{ mr: 1 }}
                        >
                            Submit
                        </Button>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            variant="outlined"
                            onClick={() => setCurrentTab('Homepage')}
                        >
                            Back to Homepage
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
}

export default SetGrades;
