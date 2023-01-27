import Todo, { ITodo } from './Todo';
import Button from '../../UI/Button';
import Input from '../../UI/Input';

const TodosList = (props: {
	todos: ITodo[];
	onShowCreate: React.MouseEventHandler;
	onRemoveTodo: Function;
	onUpdateTodo: Function;
}) => {
	const onRemoveTodo = (todoId: string) => {
		props.onRemoveTodo(todoId);
	};
	const onUpdateTodo = (todo: ITodo) => {
		props.onUpdateTodo(todo);
	};
	return (
		<div className='relative w-1/2 rounded border-t-2 border-t-amber-400 p-3 shadow-lg top-[5%] bg-neutral-800'>
			<div className='flex bg-amber-300 mb-4 py-2 rounded'>
				<button className='mx-5 text-gray-900 hover:text-teal-500 font-bold text-lg transition-all'>Active</button>
				<button className='mx-5 text-gray-900 hover:text-rose-500 font-bold text-lg transition-all'>Completed</button>
				<Input type='search' className='ml-3 py-0 bg-gray-100 text-gray-600 w-1/3' placeholder='Search Todos...' />
			</div>
			<ul className=''>
				{props.todos.map(todo => (
					<Todo
						key={todo._id}
						todo={{ _id: todo._id, title: todo.title, status: todo.status, endDate: todo.endDate }}
						onRemoveTodo={onRemoveTodo}
						onUpdateTodo={onUpdateTodo}
					/>
				))}
			</ul>
			<Button
				className='material-symbols-outlined absolute bottom-2 right-[10%] bg-amber-400 flex items-center justify-center p-1 rounded-full border-none hover:bg-yellow-400 transition-all h-10 w-10 text-4xl'
				onClick={props.onShowCreate}
			>
				add
			</Button>
		</div>
	);
};

export default TodosList;
