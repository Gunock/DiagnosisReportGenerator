import { StrictMode, useMemo } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material';
import { plPL } from '@mui/material/locale';
import { plPL as dataGridPlPL } from '@mui/x-data-grid';

import MainPage from './pages/main-page/MainPage';

import './App.css';

export default function App() {
  const themeWithLocale = useMemo(() => {
    return createTheme(plPL, dataGridPlPL);
  }, []);

  return (
    <StrictMode>
      <ThemeProvider theme={themeWithLocale}>
        <MemoryRouter>
          <Routes>
            <Route element={<MainPage />} path="/" />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    </StrictMode>
  );
}
