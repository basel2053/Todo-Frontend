import { useState } from 'react';
import updateStatus from '../../../utilities/update';

export interface ITodo {
	_id?: string;
	title: string;
	status?: 'finished' | 'unfinished';
	endDate: string;
}

const Todo = (props: { todo: ITodo; onRemoveTodo: Function; onUpdateTodo: Function }) => {
	let formatedDate: string = '';
	if (props.todo.endDate) {
		const date = new Date(props.todo.endDate);
		formatedDate = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
	}

	const [checked, setChecked] = useState(props.todo.status);
	const handleChange = async () => {
		if (checked === 'finished') {
			setChecked('unfinished');
			await updateStatus('unfinished', props.todo._id);
		} else {
			setChecked('finished');
			await updateStatus('finished', props.todo._id);
		}
	};
	const onRemoveTodo = () => {
		props.onRemoveTodo(props.todo._id);
	};
	const onUpdateTodo = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			props.onUpdateTodo({ ...props.todo, endDate: formatedDate ? props.todo.endDate.substring(0, 16) : '' });
		}
	};
	return (
		<li
			className='bg-neutral-700 p-4 rounded-lg mb-2 hover:bg-neutral-600 transition-all cursor-pointer shadow-xl flex justify-between relative s'
			onClick={onUpdateTodo}
		>
			<div className='flex'>
				<input
					type='checkbox'
					checked={checked == 'finished' ? true : false}
					onChange={handleChange}
					className='mr-3'
				/>
				<span className={checked == 'finished' ? 'line-through text-gray-500' : ''}>{props.todo.title}</span>{' '}
			</div>
			<div className='flex absolute bottom-0'>
				<span className='text-gray-400 text-xs ml-6 mr-1'>{formatedDate}</span>
				{formatedDate && <span className='material-symbols-outlined text-amber-400 text-xs'> alarm</span>}
			</div>
			<span className='material-symbols-outlined hover:text-rose-500  p-[2px]' onClick={onRemoveTodo}>
				close
			</span>
		</li>
	);
};

export default Todo;
