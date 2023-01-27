import axios from 'axios';

const updateStatus = async (status: 'finished' | 'unfinished', id?: string) => {
	await axios.patch(
		'http://localhost:3000/todos',
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
