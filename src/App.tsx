// File: src/App.tsx
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router/config';
import CookieBanner from './components/feature/CookieBanner';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <CookieBanner />
    </>
  );
}

export default App;
