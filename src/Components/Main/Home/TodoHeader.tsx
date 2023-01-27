import React from 'react';
import Input from '../../UI/Input';

const TodoHeader = (props: { query: string; todoSearchHandler: React.ChangeEventHandler }) => {
	return (
		<div className='flex bg-amber-300 mb-4 py-2 rounded'>
			<button className='mx-5 text-gray-900 hover:text-teal-500 font-bold text-lg transition-all'>Active</button>
			<button className='mx-5 text-gray-900 hover:text-rose-500 font-bold text-lg transition-all'>Completed</button>
			<Input
				type='search'
				className='ml-3 py-0 bg-gray-100 text-gray-600 w-1/3'
				placeholder='Search Todos...'
				value={props.query}
				onChange={props.todoSearchHandler}
			/>
		</div>
	);
};

export default TodoHeader;