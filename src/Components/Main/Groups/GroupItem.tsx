import { useState } from 'react';

const GroupItem = (props: { title: string; endDate?: string }) => {
	const [checked, setChecked] = useState(false);
	let formatedDate: string = '';
	if (props.endDate) {
		const date = new Date(props.endDate);
		formatedDate = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
	}
	return (
		<li className='flex justify-between items-center'>
			<div className='flex gap-2 items-center'>
				<input
					type='checkbox'
					checked={checked}
					onChange={() => {
						setChecked(!checked);
					}}
				/>
				<span className={checked ? 'line-through text-gray-600' : ''}>{props.title}</span>
			</div>
			<div className='flex '>
				<span className='text-gray-400 text-xs ml-6 mr-1'>{formatedDate}</span>
				{formatedDate && <span className='material-symbols-outlined text-amber-400 text-xs'> alarm</span>}
			</div>
		</li>
	);
};

export default GroupItem;
