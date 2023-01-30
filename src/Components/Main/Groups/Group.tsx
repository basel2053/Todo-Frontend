import GroupItem from './GroupItem';

const Group = (props: { title: string }) => {
	return (
		<article className='w-2/5 border-2 rounded-md px-5 border-gray-600 text-gray-300 shadow-xl'>
			<div className='flex items-center gap-3 mt-3'>
				<span className='w-2 h-2 rounded-full bg-amber-400'></span>
				<h2 className='text-2xl font-bold '>{props.title}</h2>
			</div>
			<hr className='border-gray-200 my-2' />
			<GroupItem />
			<GroupItem />
			<GroupItem />
			<GroupItem />
			<GroupItem />
			<GroupItem />
		</article>
	);
};

export default Group;
