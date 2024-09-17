import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'; // Import ThemeProvider
import theme from './theme'; // Import your theme object
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}> {/* Wrap your component with ThemeProvider */}
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
