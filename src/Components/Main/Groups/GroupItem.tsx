import { useState } from 'react';

const GroupItem = () => {
	const [checked, setChecked] = useState(false);
	return (
		<li>
			<div className='flex '>
				<input
					type='radio'
					checked={checked}
					onClick={() => {
						setChecked(!checked);
					}}
				/>
				<span>heyo</span>
			</div>
		</li>
	);
};

export default GroupItem;
