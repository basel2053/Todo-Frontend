import axios from 'axios';

const updateStatus = async (title: string, status: 'finished' | 'unfinished', date: Date, id?: string) => {
	await axios.patch(
		'http://localhost:3000/todos',
		{
			title: title,
			status: status,
			endDate: date,
			todoId: id,
		},
		{
			headers: { Authorization: localStorage.getItem('isLogged'), 'Content-Type': 'application/json' },
		}
	);
};

export default updateStatus;
