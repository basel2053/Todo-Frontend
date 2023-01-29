import GroupedTodos from './GroupedTodos';

const Group = () => {
	return (
		<article className='w-2/5 border-2 rounded-md px-5 border-gray-600 text-gray-300 shadow-xl'>
			<div className='flex items-center gap-3 mt-3'>
				<span className='w-2 h-2 rounded-full bg-amber-400'></span>
				<h2 className='text-2xl font-bold '>Today</h2>
			</div>
			<hr className='border-gray-200 my-2' />
			<GroupedTodos />
		</article>
	);
};

export default Group;
