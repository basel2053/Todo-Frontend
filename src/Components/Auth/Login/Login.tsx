import Card from '../../UI/Card';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../../../hooks/use-input';
import axios, { AxiosError } from 'axios';
import { useContext, useState } from 'react';
import AuthContext from '../../../context/auth-context';

const Login = () => {
	const { onLogin } = useContext(AuthContext);
	const [submitMsg, setSubmitMsg] = useState('');
	const navigate = useNavigate();

	const emailInput = useInput((val: string) => val.includes('@') && val.length > 4);
	const passwordInput = useInput((val: string) => val.length >= 6 && val.length <= 16);
	let formIsValid = false;
	if (emailInput.isValid && passwordInput.isValid) {
		formIsValid = true;
	}
	const loginHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		const res = await axios
			.post('https://todo-api-9vno.onrender.com/login', {
				email: emailInput.value,
				password: passwordInput.value,
			})
			.catch((err: AxiosError) => {
				if (err.response) setSubmitMsg(err.response.data as string);
			});
		if (res?.statusText === 'OK') {
			onLogin(res.data);
			navigate('/');
		}
	};
	return (
		<Card className='fixed z-30 w-[36%] m-auto inset-x-0 top-1/4 border'>
			{submitMsg && <p className='text-center'>{submitMsg}</p>}
			<form onSubmit={loginHandler} className='mt-8 text-center'>
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
					placeholder='Here goes your email.'
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
					placeholder='Secret password.'
				/>
				{passwordInput.hasError && (
					<p className='text-xs font-medium mt-1 text-rose-500'>Password must be between 6 and 16 characters</p>
				)}
				<Link to='/signup' className='block hover:text-purple-300 mt-3'>
					don't have an account yet?
				</Link>
				<div>
					<Button
						className='py-1 px-4 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-gray-50 transition-all cursor-pointer border-2 rounded-xl font-bold inline-block text-3xl mb-10 mt-6 disabled:text-teal-400 disabled:border-teal-400 disabled:hover:bg-transparent'
						disabled={!formIsValid}
					>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
