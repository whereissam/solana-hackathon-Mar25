import React from 'react';
import { Box, Container, Typography, TextField, Button, Paper } from '@mui/material';

const Newsletter: React.FC = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'white' }}>
      <Container maxWidth="md">
        <Paper
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
            color: 'white',
            textAlign: 'center',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}
        >
          <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
            Stay Updated on Charitable Causes
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: 600, mx: 'auto', opacity: 0.9 }}>
            Subscribe to our newsletter to receive updates on new charities, impact stories, and opportunities to make a difference.
          </Typography>
          
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            <TextField
              placeholder="Enter your email address"
              fullWidth
              variant="outlined"
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '8px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent',
                  },
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                fontWeight: 'bold',
                px: 4,
                py: 1.5,
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                },
                whiteSpace: 'nowrap'
              }}
            >
              Subscribe
            </Button>
          </Box>
          
          <Typography variant="body2" sx={{ mt: 3, opacity: 0.8 }}>
            We respect your privacy. Unsubscribe at any time.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Newsletter;