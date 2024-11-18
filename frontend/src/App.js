
import { AppBar, Toolbar } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import theme from './components/theme';
import { ThemeProvider } from '@mui/material/styles';

import { Route, Routes } from "react-router-dom"
import Login from './components/Login';
import RegisterForm from './components/Register';

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <AppBar position='inline' color="primary"><Toolbar>Welcome to GreenLeaves Bank!</Toolbar></AppBar>
        <Container>
          <Routes>
            <Route path="/" element={<RegisterForm />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;