import axios from 'axios';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import { Link } from 'react-router-dom';

const Signup = () => {
	const registerHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		// await axios.post('/http://localhost:3000/signup',{
		// 	email:,
		// 	password:,
		// 	confirmPassword:,
		// 	name:,
		// });
	};
	return (
		<Card className='fixed z-30 w-[36%] m-auto inset-x-0 top-[15%] border'>
			<form onSubmit={registerHandler} className='mt-8 text-center '>
				<label htmlFor='email' className='block text-amber-300 text-2xl mb-2'>
					Email:
				</label>
				<Input type='email' name='email' id='email' />
				<label htmlFor='password' className='block text-amber-300 text-2xl my-2'>
					Password:
				</label>
				<Input type='password' name='password' id='password' />
				<label htmlFor='confirmPassword' className='block text-amber-300 text-2xl  my-2'>
					Confirm Password:
				</label>
				<Input type='password' name='confirmPassword' id='confirmPassword' />
				<label htmlFor='name' className='block text-amber-300 text-2xl my-2'>
					Name (optional):
				</label>
				<Input type='text' name='name' id='name' />
				<Link to='/login' className='block hover:text-purple-300 mt-3'>
					already have an account?
				</Link>
				<div>
					<Button className='py-1 px-4 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-gray-50 transition-all  border-2 rounded-xl font-bold inline-block text-3xl mb-10 mt-6'>
						Register
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Signup;
