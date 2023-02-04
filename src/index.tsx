import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Components/Main/Home/Home';
import Login from './Components/Auth/Login/Login';
import Root from './Components/Root';
import Signup from './Components/Auth/Signup/Signup';
import { AuthContextProvider } from './context/auth-context';
import ErrorPage from './Components/ErrorPage';
import GroupList from './Components/Main/Groups/GroupList';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <Home />,
				index: true,
			},
			{
				path: '/groups',
				element: <GroupList />,
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/signup',
				element: <Signup />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<AuthContextProvider>
		<RouterProvider router={router} />
	</AuthContextProvider>
);
