import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../../context/auth-context';
import Button from '../../UI/Button';
const Header = () => {
	const { isLogged, onLogout } = useContext(AuthContext);

	return (
		<header className='h-14 bg-amber-400 flex items-center justify-end px-[5%]'>
			{!isLogged && (
				<Link
					className='py-1 px-6 text-gray-50 hover:bg-gray-100 hover:text-gray-800 transition-all text-xl border-2 rounded-xl font-bold '
					to='/login'
				>
					Login
				</Link>
			)}
			{isLogged && (
				<Button
					className='py-1 px-6 text-gray-50 hover:bg-gray-100 hover:text-gray-800 transition-all text-xl border-2 rounded-xl font-bold'
					onClick={onLogout}
				>
					Logout
				</Button>
			)}
		</header>
	);
};

export default Header;
