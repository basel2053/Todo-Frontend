import { useRef, useState } from 'react';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import Group from './Group';
import GroupModal from './GroupModal';

const GROUPS = ['Today', 'Groceries', 'Outing', 'House'];

const GroupList = () => {
	const [showCreate, setShowCreate] = useState(false);
	const [groups, setGroups] = useState(GROUPS);
	const groupInput = useRef<HTMLInputElement>(null);
	const createGroupHandler = () => {
		console.log(groupInput.current?.value);

		// setGroups(prevState => [...prevState]);
		// setShowCreate(false);
	};
	const closeHandler = () => {
		setShowCreate(false);
	};
	return (
		<>
			<div className='flex justify-center items-center mt-10 gap-2'>
				<Input type='search' placeholder='Search groups...' className='w-1/3' />
				<Button
					className='material-symbols-outlined  bg-amber-400 flex items-center justify-center p-1 rounded-full border-none hover:bg-yellow-400 transition-all h-9 w-9 text-4xl'
					onClick={() => {
						setShowCreate(true);
					}}
				>
					add
				</Button>
				{showCreate && <GroupModal onClose={closeHandler} />}
			</div>
			<div className='m-auto flex flex-wrap justify-center gap-5 w-10/12 h-[70vh] mt-10'>
				{groups.map(g => (
					<Group key={g} title={g} />
				))}
			</div>
		</>
	);
};

export default GroupList;
