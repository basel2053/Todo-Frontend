import Header from './Layout/Header/Header';
import { Outlet } from 'react-router-dom';

const Root = () => {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default Root;
