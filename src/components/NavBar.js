import React from 'react';
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        background: 'linear-gradient(to right, #03219bff, #23aff5ff)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box
          component={Link}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none'
          }}
        >
          
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              fontWeight: 'bold',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
            }}
          >
            Search
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/add"
            sx={{
              fontWeight: 'bold',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
            }}
          >
            Add Book
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/mybooks"
            sx={{
              fontWeight: 'bold',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
            }}
          >
            My Books
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}