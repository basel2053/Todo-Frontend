import { useEffect, useState } from 'react';
import { ITodo } from '../Home/Todo';

const TodoSelection = (props: {
	todo: ITodo;
	setActiveCount: React.Dispatch<React.SetStateAction<number>>;
	active: number;
}) => {
	const [isActive, setIsActive] = useState(false);
	let formatedDate: string = '';
	if (props.todo.endDate) {
		const date = new Date(props.todo.endDate);
		formatedDate = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
	}
	const changeHandler = () => {
		setIsActive(!isActive);
	};
	useEffect(() => {
		if (!isActive) {
			props.setActiveCount(prevCount => {
				if (prevCount !== 0) {
					return prevCount - 1;
				}

				return prevCount;
			});
		}

		if (isActive) {
			props.setActiveCount(prevCount => prevCount + 1);
		}
	}, [isActive, props.setActiveCount]);

	return (
		<div className='flex items-center gap-2 mb-2'>
			<input
				type='checkbox'
				checked={isActive}
				onChange={changeHandler}
				disabled={!isActive && props.active >= 6 ? true : false}
			/>
			<h2>{props.todo.title}</h2>
			<div className='flex '>
				<span className='text-gray-400 text-xs ml-6 mr-1'>{formatedDate}</span>
				{formatedDate && <span className='material-symbols-outlined text-amber-400 text-xs'> alarm</span>}
			</div>
		</div>
	);
};

export default TodoSelection;
