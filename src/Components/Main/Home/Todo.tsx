import axios from 'axios';
import { useState } from 'react';
import updateStatus from '../../../utilities/update';

export interface ITodo {
	_id?: string;
	title: string;
	status?: 'finished' | 'unfinished';
	endDate: Date;
}

const Todo = (props: ITodo) => {
	const [checked, setChecked] = useState(props.status);
	const handleChange = async () => {
		if (checked === 'finished') {
			setChecked('unfinished');
			await updateStatus(props.title, 'unfinished', props.endDate, props._id);
		} else {
			setChecked('finished');
			await updateStatus(props.title, 'finished', props.endDate, props._id);
		}
	};
	return (
		<li>
			<input type='checkbox' checked={checked == 'finished' ? true : false} onChange={handleChange} />
			<span className={checked == 'finished' ? 'line-through text-gray-500' : ''}>{props.title}</span>{' '}
			<span>{String(props.endDate)}</span>
		</li>
	);
};

export default Todo;
