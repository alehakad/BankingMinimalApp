
import { AppBar, Toolbar } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import theme from './utils/theme.js';
import { ThemeProvider } from '@mui/material/styles';

import { Route, Routes } from "react-router-dom"
import Login from './components/Login';
import RegisterForm from './components/Register';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import TransferPage from './components/TransferPage';
import { NotificationProvider } from './context/NotificationContext.js';
import NotificationAlert from './components/NotificationAlert';


function App() {



  return (
    <React.Fragment>
      <NotificationProvider>
        <ThemeProvider theme={theme}>
          <AppBar position='sticky' color="primary"><Toolbar>Welcome to GreenLeaves Bank!</Toolbar></AppBar>
          <NotificationAlert />
          <Container>
            <Routes>
              <Route path="/" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />

              <Route path="/transfer" element={
                <ProtectedRoute>
                  <TransferPage />
                </ProtectedRoute>
              } />

              <Route path="/register" element={<RegisterForm />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Container>
        </ThemeProvider>
      </NotificationProvider>
    </React.Fragment>
  );
}

export default App;