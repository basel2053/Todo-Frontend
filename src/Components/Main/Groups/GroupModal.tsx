import { useEffect, useState } from 'react';
import Button from '../../UI/Button';
import Card from '../../UI/Card';
import Input from '../../UI/Input';
import { Backdrop } from '../Modal/Modal';
import axios, { AxiosError } from 'axios';

const GroupModal = (props: { onClose: React.MouseEventHandler }) => {
	const [todos, setTodos] = useState([]);
	useEffect(() => {
		const getTodos = async () => {
			const res = await axios
				.get('http://localhost:3000/todos', {
					headers: { Authorization: localStorage.getItem('isLogged') },
				})
				.catch((err: AxiosError) => {
					console.log(err + 'error handling here');
				});

			if (res?.statusText === 'OK') {
				setTodos(res.data.todos);
			}
		};
		getTodos();
	}, []);
	return (
		<>
			<Backdrop onCloseModal={props.onClose} />
			<Card className='fixed z-30 w-1/3 m-auto inset-x-0 top-[20%] min-h-[50vh] bg-neutral-900 border-[2px] border-b-[3px] shadow-md px-5'>
				<div className=' my-3 flex'>
					<label className='mr-2 text-xl'>Group Name:</label>
					<Input type='text' placeholder='Group Name...' className='w-1/3 py-[1px] border-teal-400 rounded-md mr-5' />
					<Button className='rounded-md px-8  py-[2px] border-amber-400 bg-amber-400 font-bold'>Create</Button>
				</div>
				<hr className='border-amber-400 mt-3' />
				{todos.length > 0 && todos.map(t => <h1>hello world</h1>)}
			</Card>
		</>
	);
};

export default GroupModal;
