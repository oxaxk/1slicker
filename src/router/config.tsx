// File: src/router/config.tsx
import React from 'react';
import { createBrowserRouter, RouteObject, Navigate, Outlet, useLocation } from 'react-router-dom';

import NotFound from '../pages/NotFound';
import Home from '../pages/home/page';
import Datenschutz from '../pages/datenschutz/page';
import Impressum from '../pages/impressum/page';
import CookieSettingsPage from '../pages/cookie/page';
import ChatWidget from '../components/feature/ChatWidget';

function ScrollToTop() {
  const location = useLocation();

  React.useEffect(() => {
    // Ensure navigation always starts at top
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return null;
}

function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
      <ChatWidget />
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
