import React, { useEffect, useState } from 'react';

const AuthContext = React.createContext({
	isLogged: false,
	onLogout: () => {},
	onLogin: (token: string) => {},
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
		setIsLoggedIn(false);
	};
	const loginHandler = (token: string) => {
		localStorage.setItem('isLogged', token);
		setIsLoggedIn(true);
	};

	return (
		<AuthContext.Provider value={{ isLogged, onLogin: loginHandler, onLogout: logoutHandler }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
