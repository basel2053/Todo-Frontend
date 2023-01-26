import Card from '../../UI/Card';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../context/auth-context';
import axios, { AxiosError } from 'axios';
import TodosList from './TodosList';
import { ITodo } from './Todo';
import Modal from '../Modal/Modal';
const Home = () => {
	const [showModal, setShowModal] = useState(false);
	const [todos, setTodos] = useState<ITodo[]>([]);
	const { isLogged } = useContext(AuthContext);

	useEffect(() => {
		if (isLogged) {
			const getTodos = async () => {
				const res = await axios
					.get('http://localhost:3000/todos', {
						headers: { Authorization: localStorage.getItem('isLogged') },
					})
					.catch((err: AxiosError) => {
						console.log(err + 'error handling here');
					});

				if (res?.statusText === 'OK') {
					setTodos(res.data);
				}
			};
			getTodos();
		}
	}, [isLogged]);

	const showCreateHandler = () => {
		setShowModal(true);
	};
	const closeModalHandler = () => {
		setShowModal(false);
	};
	const createTodoHandler = async (todo: ITodo) => {
		setTodos(prevState => [...prevState, todo]);
		await axios
			.post('http://localhost:3000/todos', todo, {
				headers: { Authorization: localStorage.getItem('isLogged') },
			})
			.catch((err: AxiosError) => {
				console.log(err + 'error handling here');
			});
		setShowModal(false);
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
					<TodosList todos={todos} onShowCreate={showCreateHandler} />
				)}
			</div>
			{showModal && <Modal onCloseModal={closeModalHandler} onCreateTodo={createTodoHandler} />}
		</>
	);
};

export default Home;
