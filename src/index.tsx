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

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				path: '/',
				element: <Home />,
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
	<React.StrictMode>
		<AuthContextProvider>
			<RouterProvider router={router} />
		</AuthContextProvider>
	</React.StrictMode>
);
