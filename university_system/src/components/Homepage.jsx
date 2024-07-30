import React, { useEffect } from 'react';
import {
  Box, Typography, Button, Grid, Paper, useTheme, useMediaQuery
} from '@mui/material';

import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import Footer from './Footer';

function Homepage({ setCurrentTab }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    document.body.style.backgroundColor = '#1c232e';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const buttonList = [
    { icon: <SchoolIcon />, text: 'View all Degrees', action: () => setCurrentTab('Degrees') },
    { icon: <GroupIcon />, text: 'View all Cohorts', action: () => setCurrentTab('ViewCohorts') },
  ];

  return (
    <>

      <Paper
        elevation={0}
        sx={{
          width: '100%',
          height: 'auto',
          minHeight: '90vh',
          backgroundImage: 'url("1.jpg")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          overflow: 'hidden',
          animation: 'fadeIn 1s ease-in-out forwards',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            py: isSmallScreen ? 4 : 8,
          }}
        >
          <Typography
            variant={isSmallScreen ? 'h3' : 'h2'}
            component="h1"
            gutterBottom
            sx={{
              color: 'white',
              textTransform: 'uppercase',
              fontWeight: '600',
              fontFamily: 'Roboto',
              mt: 5,
              fontSize: isSmallScreen ? '4rem' : '9rem',
              animation: 'fadeIn 1s ease-in-out forwards'
            }}
          >
            Systema
          </Typography>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{
              mb: 4,
              color: 'white',
              fontWeight: '400',
              fontFamily: 'Roboto',
              width: isSmallScreen ? '80%' : '30%',
              fontSize: '1rem',
              animation: 'fadeIn 1s ease-in-out forwards'
            }}
          >
            Your academic administration system for managing universities and colleges.
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {buttonList.map((item, index) => (
              <Grid item xs={12} sm={12} md={4} lg={2.5} key={index}>
                <Button
                  variant="contained"
                  startIcon={item.icon}
                  onClick={item.action}
                  sx={{
                    typography: 'body1',
                    fontSize: '.8rem',
                    justifyContent: 'center', 
                    width: '80%', 
                    fontFamily: 'Roboto',
                    backgroundColor: '#1a2029',
                    animation: 'fadeIn 1s ease-in-out forwards'
                  }}
                >
                  {item.text}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>

      <Box sx={{
        backgroundColor: '#14181f',
        color: 'white',
        py: 4,
        textAlign: 'center',
        fontFamily: 'Roboto',
        animation: 'fadeIn 1s ease-in-out forwards',
        px: isSmallScreen ? 2 : 4,
      }}>
        <Typography variant="h4" gutterBottom sx={{ textTransform: 'uppercase', fontFamily: 'Roboto' }}>
          About Systema
        </Typography>
        <Typography variant="body1" sx={{
          mx: 'auto',
          maxWidth: isSmallScreen ? '90%' : '60%',
          mb: 4,
          fontFamily: 'Roboto',
          mt: 4
        }}>
          Systema is a revolutionary platform that brings educational administration into the 21st century. Built with the needs of academic institutions in mind, Systema offers a comprehensive suite of tools that streamline the management of university and college programs.
        </Typography>
      </Box>

      <Footer />
    </>
  );
}

export default Homepage;
