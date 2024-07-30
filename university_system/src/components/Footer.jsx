import React from 'react';
import { Box, Container, Typography} from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'black',
        color: 'white',
        py: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg" sx={{mt: 'auto' }}>
        <Typography variant="body1" align="center">
          Systema Education © {new Date().getFullYear()}
        </Typography>
        <Typography variant="body2" align="center">
            Systema
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
