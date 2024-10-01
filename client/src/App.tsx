import { useSelector } from 'react-redux';
import { RootState } from './app/store'; // Correct path
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './routes/layout/Layout';
import Login from './routes/Login';
import Register from './routes/Register';
import Services from './routes/Services';
import HomePage from './routes/Homepage';
import Blog from './routes/Blog';
import Plans from './routes/Plans';
import About from './routes/About';
import RequireAuth from './routes/layout/RequireAuth';
import Profile from './routes/Profile';
import Doctor from './routes/Doctor';
import Patient from './routes/Patient';

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/services", element: <Services /> },
        { path: "/blog", element: <Blog /> },
        { path: "/plans", element: <Plans /> },
        { path: "/about", element: <About /> },
      ],
    },{
      path: "/",
      element:<RequireAuth />,
      children: [
        { path: "/profile", element: <Profile /> },
        { path: "/patient", element: <Patient /> },
        { path: "/doctor", element: <Doctor/> },
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
