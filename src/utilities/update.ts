import axios from 'axios';

const updateStatus = async (status: 'finished' | 'unfinished', id?: string) => {
	await axios.patch(
		'https://todo-api-9vno.onrender.com/todos',
		{
			status: status,
			todoId: id,
		},
		{
			headers: { Authorization: localStorage.getItem('isLogged'), 'Content-Type': 'application/json' },
		}
	);
};

export default updateStatus;
