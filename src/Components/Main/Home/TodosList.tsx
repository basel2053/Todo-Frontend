import Todo, { ITodo } from './Todo';
import Button from '../../UI/Button';
import React, { useEffect, useReducer, useState } from 'react';
import axios, { AxiosError } from 'axios';
import TodoHeader from './TodoHeader';

interface optionAction {
	type: 'UPDATE' | 'PREV' | 'NEXT';
	page: number;
	count: number;
}

const optionsReducer = (state: { page: number; count: number }, action: optionAction) => {
	if (action.type === 'UPDATE') {
		return { page: action.page, count: action.count };
	}
	if (action.type === 'NEXT' || action.type === 'PREV') {
		return { page: action.page, count: state.count };
	}
	return { page: 1, count: 0 };
};

const TodosList = (props: {
	todos: ITodo[];
	onShowCreate: React.MouseEventHandler;
	onRemoveTodo: Function;
	onUpdateTodo: Function;
	nextHandler: React.MouseEventHandler;
	previousHandler: React.MouseEventHandler;
	todosCount: number;
	page: number;
}) => {
	const [query, setQuery] = useState('');
	const [todos, setTodos] = useState<ITodo[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [todoOptions, dispatch] = useReducer(optionsReducer, { page: 1, count: 0 });
	const [toggleActive, setToggleActive] = useState(false);
	const [toggleCompleted, setToggleCompleted] = useState(false);
	const [date, setDate] = useState<undefined | Date>();

	const anyCond = toggleActive || toggleCompleted || query || date;
	const dateSearch = async (d: Date) => {
		setDate(d);
	};

	useEffect(() => {
		if (query) {
			setIsLoading(true);
		}
		let st = '';
		if (toggleActive) {
			st = '&status=unfinished';
		} else if (toggleCompleted) {
			st = '&status=finished';
		}

		const searchedTodos = async () => {
			const res = await axios
				.post(
					'http://localhost:3000/todos/search?page=' + todoOptions.page + st,
					{ query, date: date ? date : '' },
					{
						headers: { Authorization: localStorage.getItem('isLogged') },
					}
				)
				.catch((err: AxiosError) => {
					console.log(err + 'error handling here');
				});

			if (res?.statusText === 'OK') {
				setTodos(res.data.todos);
				dispatch({ type: 'UPDATE', page: res.data.page, count: res.data.todosCount });
			}
		};
		const x = setTimeout(() => {
			anyCond ? searchedTodos() : setTodos([]);
			setIsLoading(false);
		}, 600);
		return () => {
			clearTimeout(x);
		};
	}, [query, todoOptions.page, toggleActive, toggleCompleted, date]);

	const onRemoveTodo = (todoId: string) => {
		props.onRemoveTodo(todoId);
		if (query) {
			setTodos(prevState => prevState.filter(todo => todo._id !== todoId));
		}
	};
	const onUpdateTodo = (todo: ITodo) => {
		props.onUpdateTodo(todo);
	};

	const todoSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
		setDate(undefined);
		setToggleCompleted(false);
		setToggleActive(false);
		dispatch({ type: 'UPDATE', page: 1, count: todoOptions.count });
	};
	let hasNext = props.todosCount - (props.page - 1) * 6 > 6 ? true : false;
	if (anyCond) {
		hasNext = todoOptions.count - (todoOptions.page - 1) * 6 > 6 ? true : false;
	}

	const onActiveHandler = () => {
		setToggleActive(!toggleActive);
		setToggleCompleted(false);
		setDate(undefined);
		dispatch({ type: 'UPDATE', page: 1, count: todoOptions.count });
	};
	const onCompleteHandler = () => {
		setToggleCompleted(!toggleCompleted);
		setToggleActive(false);
		setDate(undefined);
		dispatch({ type: 'UPDATE', page: 1, count: todoOptions.count });
	};
	const nextHandler = () => {
		dispatch({ type: 'NEXT', page: todoOptions.page + 1, count: todoOptions.count });
	};
	const previousHandler = () => {
		dispatch({ type: 'PREV', page: todoOptions.page - 1, count: todoOptions.count });
	};

	return (
		<div className='relative w-1/2 rounded border-t-2 border-t-amber-400 p-3 shadow-lg top-[5%] bg-neutral-800 min-h-[80%]'>
			<TodoHeader
				query={query}
				todoSearchHandler={todoSearchHandler}
				onActive={onActiveHandler}
				onComplete={onCompleteHandler}
				isActive={toggleActive}
				isCompleted={toggleCompleted}
				onDateSearch={dateSearch}
			/>
			<ul>
				{!toggleActive && !toggleCompleted && !query && !date && props.todos.length > 0 ? (
					props.todos.map(todo => (
						<Todo
							key={todo._id}
							todo={{ _id: todo._id, title: todo.title, status: todo.status, endDate: todo.endDate }}
							onRemoveTodo={onRemoveTodo}
							onUpdateTodo={onUpdateTodo}
						/>
					))
				) : anyCond ? (
					todos.map(todo => (
						<Todo
							key={todo._id}
							todo={{ _id: todo._id, title: todo.title, status: todo.status, endDate: todo.endDate }}
							onRemoveTodo={onRemoveTodo}
							onUpdateTodo={onUpdateTodo}
						/>
					))
				) : (
					<h2>No Todos yet! What you are waiting for, start creating your list, and have fun!!</h2>
				)}
				{isLoading && <h2>Fetching data in progress...</h2>}
			</ul>
			<Button
				className='material-symbols-outlined absolute bottom-2 right-[10%] bg-amber-400 flex items-center justify-center p-1 rounded-full border-none hover:bg-yellow-400 transition-all h-10 w-10 text-4xl'
				onClick={props.onShowCreate}
			>
				add
			</Button>
			<button
				className='material-symbols-outlined absolute left-[35%] bottom-[-6px] text-3xl hover:text-amber-400 transition-all disabled:text-gray-500'
				disabled={(todoOptions.page <= 1 && anyCond) || (props.page <= 1 && !anyCond) ? true : false}
				onClick={anyCond ? previousHandler : props.previousHandler}
			>
				chevron_left
			</button>
			<button
				className='material-symbols-outlined absolute right-[35%] bottom-[-6px] text-3xl hover:text-amber-400 transition-all disabled:text-gray-500'
				disabled={!hasNext}
				onClick={anyCond ? nextHandler : props.nextHandler}
			>
				chevron_right
			</button>
		</div>
	);
};

export default TodosList;
