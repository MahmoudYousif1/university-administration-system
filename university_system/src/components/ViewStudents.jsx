import React, { useState, useEffect } from 'react';
import {
  Box, CircularProgress, Typography, Paper, Container, List, ListItem, ListItemText, Button,
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function ViewStudents({ studentId, setCurrentTab }) {
  const [student, setStudent] = useState(null);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const studentResponse = await fetch(`http://127.0.0.1:8000/api/student/${studentId}/`); // Fetch student details
        const studentData = await studentResponse.json();
        setStudent(studentData);

        const gradesResponse = await fetch(`http://127.0.0.1:8000/api/grade/?student=${studentId}`); // Fetch grades for the student
        const gradesData = await gradesResponse.json();

        const gradesWithDetailsPromises = gradesData.map(async (grade) => { // Fetch module and cohort details for each grade
          const moduleCode = grade.module.split('/')[5]; // Extract module code from the URL
          const cohortCode = grade.cohort.split('/')[5]; // Extract cohort code from the URL
 
          const [moduleResponse, cohortResponse] = await Promise.all([ 
            fetch(`http://127.0.0.1:8000/api/module/${moduleCode}/`),  // Fetch module details
            fetch(`http://127.0.0.1:8000/api/cohort/${cohortCode}/`) // Fetch cohort details
          ]);

          const moduleData = await moduleResponse.json(); // Parse module details
          const cohortData = await cohortResponse.json(); // Parse cohort details

          return {
            ...grade,
            moduleName: moduleData.full_name,
            cohortName: cohortData.name
          };
        });


        const gradesWithDetails = await Promise.all(gradesWithDetailsPromises); // Wait for all grade details to be fetched
        setGrades(gradesWithDetails); // Set the grades with details

      } catch (error) {
        console.error("Error fetching data:", error); // Log the error
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]);



  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Typography color="error" sx={{ textAlign: 'center' }}>{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="100" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ fontSize: '2em' }}>
          STUDENT DETAILS
        </Typography>

        <Button
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          onClick={() => setCurrentTab('ViewCohorts')}
          sx={{ mt: 2, fontSize: '1.2em' }}
        >
          Back to Cohorts
        </Button>
        {student && (
          <List>
            <ListItem divider>
              <ListItemText primary="Name" secondary={`${student.first_name} ${student.last_name}`} primaryTypographyProps={{ style: { fontSize: '1.5em' } }} secondaryTypographyProps={{ style: { fontSize: '1.2em' } }} />
            </ListItem>
            <ListItem divider>
              <ListItemText primary="Email" secondary={student.email} primaryTypographyProps={{ style: { fontSize: '1.5em' } }} secondaryTypographyProps={{ style: { fontSize: '1.2em' } }} />
            </ListItem>
          </List>
        )}
        <Typography variant="h5" gutterBottom sx={{ mt: 4, fontSize: '1.8em' }}>
          Grades
        </Typography>
        {grades.length > 0 ? (
          <List>
            {grades.map((grade, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={`Module: ${grade.moduleName || 'N/A'}`}
                  secondary={`CA Mark: ${grade.ca_mark}, Exam Mark: ${grade.exam_mark}, Total Grade: ${grade.total_grade}`}
                  primaryTypographyProps={{ style: { fontSize: '1.3em' } }}
                  secondaryTypographyProps={{ style: { fontSize: '1.2em' } }}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1" style={{ fontSize: '1.2em' }}>No grades available.</Typography>
        )}
      </Paper>
    </Container>
  );
}

export default ViewStudents;
