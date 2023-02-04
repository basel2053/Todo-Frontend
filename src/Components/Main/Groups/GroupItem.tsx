import { useState } from 'react';
import updateStatus from '../../../utilities/update';
import { ITodo } from '../Home/Todo';

const GroupItem = (props: { todo: ITodo }) => {
	const [checked, setChecked] = useState(props.todo.status);
	let formatedDate: string = '';
	if (props.todo.endDate) {
		const date = new Date(props.todo.endDate);
		formatedDate = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
	}
	const handleChange = async () => {
		if (checked === 'finished') {
			setChecked('unfinished');
			await updateStatus('unfinished', props.todo._id);
		} else {
			setChecked('finished');
			await updateStatus('finished', props.todo._id);
		}
	};

	return (
		<li className='flex justify-between items-center'>
			<div className='flex gap-2 items-center'>
				<input type='checkbox' checked={checked == 'finished' ? true : false} onChange={handleChange} />
				<span className={checked == 'finished' ? 'line-through text-gray-600' : ''}>{props.todo.title}</span>
			</div>
			<div className='flex '>
				<span className='text-gray-400 text-xs ml-6 mr-1'>{formatedDate}</span>
				{formatedDate && <span className='material-symbols-outlined text-amber-400 text-xs'> alarm</span>}
			</div>
		</li>
	);
};

export default GroupItem;
