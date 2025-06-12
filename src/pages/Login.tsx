import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  
  const handleLogin = async () => {
    try {
      const res = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/products');
      } else {
        alert('Usuário ou senha inválidos');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao tentar fazer login');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#111',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          height: isMobile ? '25vh' : '30vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <StarIcon
    sx={{
      fontSize: isMobile ? 60 : 80,
      color: '#fff',
      animation: 'spin 8s linear infinite',
      '@keyframes spin': {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
      },
    }}
  />
      </Box>

      <Paper
        elevation={3}
        sx={{
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          mt: isMobile ? -6 : -8,
          px: isMobile ? 4 : 6,
          pt: isMobile ? 5 : 6,
          pb: isMobile ? 3 : 4,
          width: '100%',
          maxWidth: isMobile ? '100%' : 400,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      >
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          align="center"
          fontWeight="bold"
          gutterBottom
        >
          Login
        </Typography>

        <TextField
          label="Nome"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{
            backgroundColor: '#e0e0e0',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': { borderRadius: 2 },
          }}
        />
        <TextField
          label="Senha"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            backgroundColor: '#e0e0e0',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': { borderRadius: 2 },
          }}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          sx={{
            mt: 3,
            backgroundColor: '#111',
            borderRadius: 2,
            textTransform: 'none',
            '&:hover': { backgroundColor: '#333' },
          }}
        >
          Log in
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginPage;
