import React, { useEffect, useState } from 'react';

const AuthContext = React.createContext({
	isLogged: false,
	onLogout: () => {},
	onLogin: (data: { token: string; userId: string }) => {},
});

export const AuthContextProvider = (props: { children: React.ReactNode }) => {
	const [isLogged, setIsLoggedIn] = useState(false);
	useEffect(() => {
		const getLogged = localStorage.getItem('isLogged');
		if (getLogged) {
			setIsLoggedIn(true);
		}
	}, []);
	const logoutHandler = () => {
		localStorage.removeItem('isLogged');
		localStorage.removeItem('userId');
		setIsLoggedIn(false);
	};
	const loginHandler = (data: { token: string; userId: string }) => {
		localStorage.setItem('isLogged', data.token);
		localStorage.setItem('userId', data.userId);

		setIsLoggedIn(true);
	};

	return (
		<AuthContext.Provider value={{ isLogged, onLogin: loginHandler, onLogout: logoutHandler }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
