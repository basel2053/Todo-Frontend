import { useState } from 'react';

const GroupItem = (props: { title: string }) => {
	const [checked, setChecked] = useState(false);
	return (
		<li className='flex justify-between'>
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
			<span className='material-symbols-outlined hover:text-rose-500 cursor-pointer p-[2px] transition-all'>close</span>
		</li>
	);
};

export default GroupItem;
