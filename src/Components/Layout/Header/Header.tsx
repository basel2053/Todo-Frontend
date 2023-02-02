import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../../context/auth-context';
import Button from '../../UI/Button';
const Header = () => {
	const navigate = useNavigate();
	const { isLogged, onLogout } = useContext(AuthContext);
	const onLogoutHandler = () => {
		navigate('/');
		onLogout();
	};
	return (
		<header className='h-14 bg-amber-400 flex items-center justify-end px-[5%]'>
			<ul className='flex items-center'>
				<li>
					<NavLink
						className={({ isActive }) =>
							(isActive ? 'bg-gray-100 text-gray-800' : '') +
							` py-1 px-6 text-gray-50 hover:bg-gray-100 hover:text-gray-800 transition-all text-xl border-2 rounded-xl font-bold`
						}
						to='/'
					>
						Home
					</NavLink>
				</li>

				<li>
					{!isLogged && (
						<Link
							className='py-1 px-6 text-gray-50 hover:bg-gray-100 hover:text-gray-800 transition-all text-xl border-2 rounded-xl font-bold ml-6'
							to='/login'
						>
							Login
						</Link>
					)}
				</li>
				{isLogged && (
					<>
						<li>
							<NavLink
								className={({ isActive }) =>
									(isActive ? 'bg-gray-100 text-gray-800' : '') +
									' py-1 px-6 text-gray-50 hover:bg-gray-100 hover:text-gray-800 transition-all text-xl border-2 rounded-xl font-bold ml-6'
								}
								to='/groups'
							>
								Groups
							</NavLink>
						</li>
						<li>
							<Button
								className='py-[1px] px-6 text-gray-50 hover:bg-gray-100 hover:text-gray-800 transition-all text-xl border-2 rounded-xl font-bold ml-6'
								onClick={onLogoutHandler}
							>
								Logout
							</Button>
						</li>
					</>
				)}
			</ul>
		</header>
	);
};

export default Header;
