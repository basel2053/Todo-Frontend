import { useState } from 'react';
import updateStatus from '../../../utilities/update';

export interface ITodo {
	_id?: string;
	title: string;
	status?: 'finished' | 'unfinished';
	endDate: Date;
}

const Todo = (props: ITodo) => {
	let formatedDate: string = '';
	if (props.endDate) {
		const date = new Date(props.endDate);
		formatedDate = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
	}

	const [checked, setChecked] = useState(props.status);
	const handleChange = async () => {
		if (checked === 'finished') {
			setChecked('unfinished');
			await updateStatus('unfinished', props._id);
		} else {
			setChecked('finished');
			await updateStatus('finished', props._id);
		}
	};
	return (
		<li>
			<input type='checkbox' checked={checked == 'finished' ? true : false} onChange={handleChange} />
			<span className={checked == 'finished' ? 'line-through text-gray-500' : ''}>{props.title}</span>{' '}
			<span>{formatedDate}</span>
		</li>
	);
};

export default Todo;
