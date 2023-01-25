import { Link } from 'react-router-dom';
const Header = () => {
	return (
		<header className='h-14 bg-amber-400 flex items-center justify-end px-[5%]'>
			<Link
				className='py-1 px-6 text-gray-50 hover:bg-gray-100 hover:text-gray-800 transition-all text-xl border-2 rounded-xl font-bold '
				to='/login'
			>
				Login
			</Link>
		</header>
	);
};

export default Header;
