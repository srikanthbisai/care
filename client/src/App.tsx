import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './routes/layout/Layout';
import RequireAuth from './routes/layout/RequireAuth';
import React, { Suspense } from 'react';
import Spinner from './components/Spinner'; 
import "./App.css"

const Login = React.lazy(() => import('./routes/Login'));
const Register = React.lazy(() => import('./routes/Register'));
const Services = React.lazy(() => import('./routes/Services'));
const HomePage = React.lazy(() => import('./routes/Homepage'));
const Blog = React.lazy(() => import('./routes/Blog'));
const Plans = React.lazy(() => import('./routes/Plans'));
const About = React.lazy(() => import('./routes/About'));
const Profile = React.lazy(() => import('./routes/Profile'));
const Doctor = React.lazy(() => import('./routes/Doctor'));
const Patient = React.lazy(() => import('./routes/Patient'));

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<Spinner />}>
              <HomePage />
            </Suspense>
          ),
        },
        {
          path: "/login",
          element: (
            <Suspense fallback={<Spinner />}>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "/register",
          element: (
            <Suspense fallback={<Spinner />}>
              <Register />
            </Suspense>
          ),
        },
        {
          path: "/services",
          element: (
            <Suspense fallback={<Spinner />}>
              <Services />
            </Suspense>
          ),
        },
        {
          path: "/blog",
          element: (
            <Suspense fallback={<Spinner />}>
              <Blog />
            </Suspense>
          ),
        },
        {
          path: "/plans",
          element: (
            <Suspense fallback={<Spinner />}>
              <Plans />
            </Suspense>
          ),
        },
        {
          path: "/about",
          element: (
            <Suspense fallback={<Spinner />}>
              <About />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: (
            <Suspense fallback={<Spinner />}>
              <Profile />
            </Suspense>
          ),
        },
        {
          path: "/patient",
          element: (
            <Suspense fallback={<Spinner />}>
              <Patient />
            </Suspense>
          ),
        },
        {
          path: "/doctor",
          element: (
            <Suspense fallback={<Spinner />}>
              <Doctor />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
