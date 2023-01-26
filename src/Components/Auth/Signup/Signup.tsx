import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import useInput from '../../../hooks/use-input';

const Signup = () => {
	const emailInput = useInput((val: string) => val.includes('@') && val.length > 4);
	const passwordInput = useInput((val: string) => val.length >= 6 && val.length <= 16);
	const confirmInput = useInput((val: string) => val === passwordInput.value);
	const nameInput = useInput((val: string) => val.trim() !== '');

	let formIsValid = false;
	if (emailInput.isValid && passwordInput.isValid && confirmInput.isValid) {
		formIsValid = true;
	}
	const registerHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		const res = await axios.post('/http://localhost:3000/signup', {
			email: emailInput.value,
			password: passwordInput.value,
			confirmPassword: confirmInput.value,
			name: nameInput.value,
		});
	};
	return (
		<Card className='fixed z-30 w-[36%] m-auto inset-x-0 top-[15%] border'>
			<form onSubmit={registerHandler} className='mt-8 text-center '>
				<label htmlFor='email' className='block text-amber-300 text-2xl mb-2'>
					Email:
				</label>
				<Input
					type='email'
					name='email'
					id='email'
					value={emailInput.value}
					onChange={emailInput.inputChangeHandler}
					onBlur={emailInput.inputBlurHandler}
					className={emailInput.hasError ? 'border-rose-500' : ''}
				/>
				{emailInput.hasError && <p className='text-xs font-medium mt-1 text-rose-500'>Email must be valid.</p>}
				<label htmlFor='password' className='block text-amber-300 text-2xl my-2'>
					Password:
				</label>
				<Input
					type='password'
					name='password'
					id='password'
					value={passwordInput.value}
					onChange={passwordInput.inputChangeHandler}
					onBlur={passwordInput.inputBlurHandler}
					className={passwordInput.hasError ? 'border-rose-500' : ''}
				/>
				{passwordInput.hasError && (
					<p className='text-xs font-medium mt-1 text-rose-500'>Password must be between 6 and 16 characters</p>
				)}
				<label htmlFor='confirmPassword' className='block text-amber-300 text-2xl  my-2'>
					Confirm Password:
				</label>
				<Input
					type='password'
					name='confirmPassword'
					id='confirmPassword'
					value={confirmInput.value}
					onChange={confirmInput.inputChangeHandler}
					onBlur={confirmInput.inputBlurHandler}
					className={confirmInput.hasError ? 'border-rose-500' : ''}
				/>
				{confirmInput.hasError && <p className='text-xs font-medium mt-1 text-rose-500'>Password doesn't match.</p>}
				<label htmlFor='name' className='block text-amber-300 text-2xl my-2'>
					Name (optional):
				</label>
				<Input
					type='text'
					name='name'
					id='name'
					value={nameInput.value}
					onChange={nameInput.inputChangeHandler}
					onBlur={nameInput.inputBlurHandler}
				/>
				<Link to='/login' className='block hover:text-purple-300 mt-3'>
					already have an account?
				</Link>
				<div>
					<Button
						className='py-1 px-4 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-gray-50 transition-all cursor-pointer border-2 rounded-xl font-bold inline-block text-3xl mb-10 mt-6 disabled:text-teal-400 disabled:border-teal-400 disabled:hover:bg-transparent'
						disabled={!formIsValid}
					>
						Register
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Signup;
