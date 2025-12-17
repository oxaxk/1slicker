// File: src/router/config.tsx
import React from 'react';
import { createBrowserRouter, RouteObject, Navigate, Outlet } from 'react-router-dom';

import NotFound from '../pages/NotFound';
import Home from '../pages/home/page';
import Datenschutz from '../pages/datenschutz/page';
import Impressum from '../pages/impressum/page';
import CookieSettingsPage from '../pages/cookie/page';
import CookieBanner from '../components/feature/CookieBanner';

function RootLayout() {
  return (
    <>
      <Outlet />
      <CookieBanner />
    </>
  );
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'home',
        element: <Navigate to="/" replace />,
      },
      {
        path: 'cookie',
        element: <CookieSettingsPage />,
      },
      {
        path: 'datenschutz',
        element: <Datenschutz />,
      },
      {
        path: 'impressum',
        element: <Impressum />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
