import GroupItem from './GroupItem';
import { IGroup } from './GroupList';

const Group = (props: { group: IGroup }) => {
	return (
		<article className='w-2/5 border-2 rounded-md px-5 border-gray-600 text-gray-300 shadow-xl pb-2'>
			<div className='flex items-center gap-3 mt-3'>
				<span className={'w-2 h-2 rounded-full bg-sky-400'}></span>
				<h2 className='text-2xl font-bold '>{props.group.name}</h2>
			</div>
			<hr className='border-gray-200 my-2' />
			{props.group.todos.map(t => (
				<GroupItem key={t.id} title={t.title} />
			))}
		</article>
	);
};

export default Group;
