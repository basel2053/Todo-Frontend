import React, { useEffect, useState } from 'react';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import Group from './Group';
import GroupModal from './GroupModal';
import axios, { AxiosError } from 'axios';
import { ITodo } from '../Home/Todo';

export interface IGroup {
	_id: string;
	name: string;
	color: number;
	todos: ITodo[];
}

const GroupList = () => {
	const [showCreate, setShowCreate] = useState(false);
	const [groups, setGroups] = useState<IGroup[]>([]);
	const [query, setQuery] = useState('');
	useEffect(() => {
		const getGroups = async () => {
			const res = await axios
				.get('http://localhost:3000/groups', {
					headers: { Authorization: localStorage.getItem('isLogged') },
				})
				.catch((err: AxiosError) => {
					console.log(err + 'error handling here');
				});
			if (res?.statusText === 'OK') {
				setGroups(res.data);
			}
		};
		getGroups();
	}, []);

	const closeHandler = () => {
		setShowCreate(false);
	};

	const onCreateHandler = async (groupName: string, activeList: ITodo[]) => {
		const random = Math.floor(Math.random() * 10);
		setGroups(prevGroups => [
			...prevGroups,
			{ _id: String(Date.now()), name: groupName, color: random, todos: activeList },
		]);

		const ids = activeList.map(todo => todo._id);
		await axios.post(
			'http://localhost:3000/groups',
			{ name: groupName, color: random, todos: ids },
			{
				headers: { Authorization: localStorage.getItem('isLogged') },
			}
		);
	};

	const serachHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};
	const filteredGroups = query ? groups.filter(g => g.name.toLowerCase().includes(query.toLowerCase())) : groups;
	return (
		<>
			<div className='flex justify-center items-center mt-10 gap-2'>
				<Input type='search' placeholder='Search groups...' className='w-1/3' value={query} onChange={serachHandler} />
				<Button
					className='material-symbols-outlined  bg-amber-400 flex items-center justify-center p-1 rounded-full border-none hover:bg-yellow-400 transition-all h-9 w-9 text-4xl'
					onClick={() => {
						setShowCreate(true);
					}}
				>
					add
				</Button>
				{showCreate && <GroupModal onClose={closeHandler} onCreate={onCreateHandler} />}
			</div>

			{groups.length > 0 ? (
				<div className='m-auto flex flex-wrap justify-center gap-5 w-10/12 min-h-[70vh] my-10'>
					{filteredGroups.map(g => (
						<Group key={g._id} group={g} />
					))}
				</div>
			) : (
				<h2 className='text-center text-amber-400 text-2xl mt-8 font-medium'>You don't have any group yet...</h2>
			)}
		</>
	);
};

export default GroupList;
