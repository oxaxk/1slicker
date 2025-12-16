// File: src/App.tsx
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router/config';
import CookieBanner from './components/feature/CookieBanner';

function App() {
  return (
    <>
      <CookieBanner />
      <RouterProvider router={router} />
    </>
  );
}

export default App;