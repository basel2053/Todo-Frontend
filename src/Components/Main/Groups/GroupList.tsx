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
	const [editGroup, setEditGroup] = useState<IGroup | undefined>();
	useEffect(() => {
		const getGroups = async () => {
			const res = await axios
				.get('https://todo-api-9vno.onrender.com/groups', {
					headers: { Authorization: localStorage.getItem('isLogged') },
				})
				.catch((err: AxiosError) => {
					console.log(err + 'error handling here');
				});
			if (res?.status === 200) {
				setGroups(res.data.groups);
			}
		};
		getGroups();
	}, []);

	const closeHandler = () => {
		setShowCreate(false);
	};

	const onCreateHandler = async (groupName: string, activeList: ITodo[], group?: IGroup) => {
		let random = group?.color || Math.floor(Math.random() * 10);
		if (group) {
			setGroups(prevGroups =>
				prevGroups.map(g => (g._id !== group._id ? g : { ...group, name: groupName, todos: activeList }))
			);
		}

		const ids = activeList.map(todo => todo._id);
		const res = await axios({
			method: group ? 'patch' : 'post',
			url: 'https://todo-api-9vno.onrender.com/groups',
			data: { groupId: group?._id, name: groupName, color: random, todos: ids },
			headers: { Authorization: localStorage.getItem('isLogged') },
		});
		if (!group) {
			setGroups(prevGroups => [...prevGroups, { _id: res.data.id, name: groupName, color: random, todos: activeList }]);
		}
	};

	const groupDeleteHandler = async (id: string) => {
		if (confirm('confirm deleting this group.')) {
			setGroups(prevGroups => prevGroups.filter(g => g._id !== id));
			await axios
				.delete('https://todo-api-9vno.onrender.com/groups', {
					headers: { Authorization: localStorage.getItem('isLogged'), 'Content-Type': 'application/json' },
					data: {
						groupId: id,
					},
				})
				.catch((err: AxiosError) => {
					console.log(err + ' error handling here');
				});
		}
	};

	const groupEditHandler = (group: IGroup) => {
		setShowCreate(true);
		setEditGroup(group);
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
						setEditGroup(undefined);
					}}
				>
					add
				</Button>
				{showCreate && <GroupModal onClose={closeHandler} onCreate={onCreateHandler} group={editGroup} />}
			</div>

			{groups.length > 0 ? (
				<div className='m-auto flex flex-wrap justify-center gap-5 w-10/12 min-h-[70vh] my-10'>
					{filteredGroups.map(g => (
						<Group key={g._id} group={g} onDelete={groupDeleteHandler} onEdit={groupEditHandler} />
					))}
				</div>
			) : (
				<h2 className='text-center text-amber-400 text-2xl mt-8 font-medium'>You don't have any group yet...</h2>
			)}
		</>
	);
};

export default GroupList;
