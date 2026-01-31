import { createBrowserRouter } from 'react-router-dom';

import Home from '@screens/Home';
import { Categories } from '@screens/Categories';
import Layout from '@ui/Layout';
import Loading from '@ui/Loading';
import { Auth } from '@components/Auth';

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'categories',
        element: <Categories />,
      },
      // About page (lazy loaded)
      {
        path: 'about',
        HydrateFallback: Loading,
        lazy: async () => {
          const { default: About } = await import('@screens/About');
          return { Component: About };
        },
      },
    ],
  },
]);
