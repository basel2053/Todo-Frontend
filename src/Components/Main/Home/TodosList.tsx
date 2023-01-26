import Todo, { ITodo } from './Todo';
import Button from '../../UI/Button';

const TodosList = (props: { todos: ITodo[]; onShowCreate: React.MouseEventHandler }) => {
	return (
		<div className='relative'>
			<ul className='border'>
				{props.todos.map(todo => (
					<Todo key={todo._id} _id={todo._id} title={todo.title} status={todo.status} endDate={todo.endDate} />
				))}
			</ul>
			<Button className='absolute bottom-4 right-6' onClick={props.onShowCreate}>
				Create Todo
			</Button>
		</div>
	);
};

export default TodosList;
