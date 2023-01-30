import React, { useEffect, useState } from 'react';
import Button from '../../UI/Button';
import Card from '../../UI/Card';
import Input from '../../UI/Input';
import { Backdrop } from '../Modal/Modal';
import axios, { AxiosError } from 'axios';
import { ITodo } from '../Home/Todo';
import TodoSelection from './TodoSelection';

const GroupModal = (props: { onClose: React.MouseEventHandler }) => {
	const [todos, setTodos] = useState<ITodo[]>([]);
	const [activeCount, setActiveCount] = useState(0);
	const [groupName, setGroupName] = useState('');
	useEffect(() => {
		const getTodos = async () => {
			const res = await axios
				.get('http://localhost:3000/todos/all', {
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
	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setGroupName(e.target.value);
	};
	return (
		<>
			<Backdrop onCloseModal={props.onClose} />
			<Card className='fixed z-30 w-1/3 m-auto inset-x-0 top-[20%] h-[50vh] bg-neutral-900 border-[2px] border-b-[3px] shadow-md overflow-hidden overflow-y-scroll px-3'>
				<div className=' pt-5 pb-7 flex sticky top-0  w-full z-20 bg-neutral-900 sticky-bottom'>
					<label className='mr-2 text-xl'>Group Name:</label>
					<Input
						type='text'
						placeholder='Group Name...'
						className='w-1/3 py-[1px] border-teal-400 rounded-md mr-6'
						onChange={onChangeHandler}
						value={groupName}
					/>
					<Button
						className='rounded-md w-1/4 py-[2px] border-amber-400 bg-amber-400 font-bold hover:bg-amber-500 hover:border-amber-500 transition-all disabled:cursor-not-allowed disabled:bg-neutral-600 disabled:border-none'
						disabled={activeCount == 0 || (groupName.trim() === '' && true)}
					>
						Create
					</Button>
					{(groupName.trim() === '' || activeCount == 0) && (
						<p className='text-xs absolute bottom-1 text-rose-500'>
							group must not be empty and select at least one todo
						</p>
					)}
				</div>
				<div className='mt-2'>
					{todos.length > 0 &&
						todos.map(t => <TodoSelection key={t._id} todo={t} setActiveCount={setActiveCount} active={activeCount} />)}
				</div>
			</Card>
		</>
	);
};

export default GroupModal;
