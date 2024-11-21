import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import { AuthProvider } from './components/context/auth.context.jsx';
import TodoApp from './components/todo/TodoApp.jsx';
import BookPage from './pages/book.jsx';
import ErrorPage from './pages/error.jsx';
import LoginPage from './pages/login.jsx';
import PrivateRoute from './pages/private.route.jsx';
import RegisterPage from './pages/register.jsx';
import UserPage from './pages/user.jsx';
import './styles/global.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <TodoApp />,
      },
      {
        path: '/users',
        element: <UserPage />,
      },
      {
        path: '/books',
        element: (
          <PrivateRoute>
            <BookPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
);
