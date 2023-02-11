import Card from '../../UI/Card';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/auth-context';
import axios, { AxiosError } from 'axios';
import TodosList from './TodosList';
import { ITodo } from './Todo';
import Modal from '../Modal/Modal';
const Home = () => {
	const [showModal, setShowModal] = useState(false);
	const [todosCount, setTodosCount] = useState(0);
	const [todos, setTodos] = useState<ITodo[]>([]);
	const [updatingTodo, setUpdatingTodo] = useState<ITodo | undefined>();
	const { isLogged } = useContext(AuthContext);
	const navigate = useNavigate();
	let params = new URLSearchParams(window.location.search);
	let queryPage = params.get('page');
	const [page, setPage] = useState(Number(queryPage) || 1);

	const getTodos = async () => {
		const res = await axios
			.get('http://localhost:3000/todos?page=' + page, {
				headers: { Authorization: localStorage.getItem('isLogged') },
			})
			.catch((err: AxiosError) => {
				console.log(err + 'error handling here');
			});

		if (res?.statusText === 'OK') {
			setTodos(res.data.todos);
			setTodosCount(res.data.todosCount);
			setPage(res.data.page);
		}
	};
	useEffect(() => {
		if (isLogged) {
			getTodos();
		}
	}, [isLogged, page]);

	const showCreateHandler = () => {
		setShowModal(true);
		setUpdatingTodo(undefined);
	};
	const closeModalHandler = () => {
		setShowModal(false);
	};
	const updateTodoHandler = (todo: ITodo) => {
		setShowModal(true);
		setUpdatingTodo(todo);
	};
	const createTodoHandler = async (todo: ITodo) => {
		try {
			const res = await axios.post('http://localhost:3000/todos', todo, {
				headers: { Authorization: localStorage.getItem('isLogged') },
			});

			setTodosCount(todosCount + 1);
			setShowModal(false);
			if (todos.length < 6) {
				setTodos(prevState => [...prevState, { _id: res.data.id, ...todo }]);
			}
		} catch (err) {
			console.log(err);
		}
	};
	const removeTodoHandler = async (todoId: string) => {
		if (confirm('confirm deleting this item.')) {
			await axios
				.delete('http://localhost:3000/todos', {
					headers: { Authorization: localStorage.getItem('isLogged'), 'Content-Type': 'application/json' },
					data: {
						todoId,
					},
				})
				.catch((err: AxiosError) => {
					console.log(err + ' error handling here');
				});
		}
		getTodos();
	};
	const editTodoHandler = async (todo: ITodo) => {
		setTodos(prevState =>
			prevState.map(t => (t._id !== todo._id ? t : { ...t, title: todo.title, endDate: todo.endDate }))
		);

		await axios
			.patch(
				'http://localhost:3000/todos',
				{
					todoId: todo._id,
					title: todo.title,
					endDate: todo.endDate,
				},
				{
					headers: { Authorization: localStorage.getItem('isLogged'), 'Content-Type': 'application/json' },
				}
			)
			.catch((err: AxiosError) => {
				console.log(err + ' error handling here');
			});
		setShowModal(false);
	};

	const nextHandler = () => {
		setPage(page + 1);
		navigate({
			search: '?page=' + (page + 1),
		});
	};
	const previousHandler = () => {
		setPage(page - 1);
		navigate({
			search: '?page=' + (page - 1),
		});
	};
	return (
		<>
			<div className='flex h-[80vh] items-center justify-between px-[10%]'>
				<div>
					<h1 className='text-6xl font-bold mb-4'>Welcome, Friend</h1>
					<h2 className='text-5xl text-amber-400 font-bold'>to my todo list</h2>
				</div>
				{!isLogged ? (
					<Card className=' bg-amber-400'>
						<div className=' w-[360px] border-b border-b-indigo-400 '>
							<img src='/to-do-list-apps.png' className='w-full' alt='todo image' />
						</div>
						<div className='text-center'>
							<Link
								className='py-1 px-5 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-gray-50 transition-all text-5xl my-8 border-2 rounded-xl font-bold inline-block'
								to='/signup'
							>
								GET STARTED
							</Link>
						</div>
					</Card>
				) : (
					<TodosList
						todos={todos}
						onShowCreate={showCreateHandler}
						onRemoveTodo={removeTodoHandler}
						onUpdateTodo={updateTodoHandler}
						nextHandler={nextHandler}
						previousHandler={previousHandler}
						todosCount={todosCount}
						page={page}
					/>
				)}
			</div>
			{showModal && (
				<Modal
					onCloseModal={closeModalHandler}
					onCreateTodo={createTodoHandler}
					onUpdateTodo={editTodoHandler}
					todo={updatingTodo}
				/>
			)}
		</>
	);
};

export default Home;
