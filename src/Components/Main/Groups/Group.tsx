import GroupItem from './GroupItem';
import { IGroup } from './GroupList';

const bgColors = [
	'bg-sky-400',
	'bg-teal-400',
	'bg-indigo-400',
	'bg-purple-400',
	'bg-rose-400',
	'bg-emerald-400',
	'bg-lime-400',
	'bg-amber-400',
	'bg-pink-400',
	'bg-orange-400',
];

const Group = (props: { group: IGroup; onDelete: Function; onEdit: Function }) => {
	const onGroupDelete = () => {
		props.onDelete(props.group._id);
	};
	const onGroupEdit = () => {
		props.onEdit(props.group);
	};
	return (
		<article className='w-2/5 border-2 rounded-md px-5 border-gray-600 text-gray-300 shadow-xl pb-2 relative'>
			<div className='absolute top-2 right-2'>
				<span
					className='material-symbols-outlined text-base cursor-pointer text-amber-300 hover:text-yellow-500 transition-all'
					onClick={onGroupEdit}
				>
					edit
				</span>
				<span
					className='material-symbols-outlined  text-base cursor-pointer mx-1 text-rose-400 hover:text-rose-500 transition-all'
					onClick={onGroupDelete}
				>
					delete
				</span>
				{/* <span className='material-symbols-outlined text-xs cursor-pointer'> close</span> */}
			</div>
			<div className='flex items-center gap-3 mt-3'>
				<span className={'w-2 h-2 rounded-full ' + bgColors[props.group.color]}></span>
				<h2 className='text-2xl font-bold '>{props.group.name}</h2>
			</div>
			<hr className='border-gray-200 my-2' />
			{props.group.todos.map(t => (
				<GroupItem key={t._id} todo={t} />
			))}
		</article>
	);
};

export default Group;
