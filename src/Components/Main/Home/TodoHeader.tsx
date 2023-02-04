import { useState } from 'react';
import Input from '../../UI/Input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TodoHeader = (props: {
	query: string;
	todoSearchHandler: React.ChangeEventHandler;
	onActive: React.MouseEventHandler;
	onComplete: React.MouseEventHandler;
	onDateSearch: Function;
	isActive: boolean;
	isCompleted: boolean;
}) => {
	const [startDate, setStartDate] = useState(new Date());
	const dateChangeHandler = (date: Date) => {
		setStartDate(date);
		props.onDateSearch(date);
	};
	return (
		<div className='flex items-center bg-amber-300 mb-4 py-2 rounded'>
			<button
				className={`mx-5 text-gray-900 hover:text-teal-500 font-bold text-lg transition-all ${
					props.isActive ? 'text-teal-500' : ''
				}`}
				onClick={props.onActive}
			>
				Active
			</button>
			<button
				className={`mx-5 text-gray-900 hover:text-rose-500 font-bold text-lg transition-all ${
					props.isCompleted ? 'text-red-500' : ''
				}`}
				onClick={props.onComplete}
			>
				Completed
			</button>
			<Input
				type='search'
				className='ml-3 py-0 bg-gray-100 text-gray-600 w-1/3 mr-8'
				placeholder='Search Todos...'
				value={props.query}
				onChange={props.todoSearchHandler}
			/>
			{/* <input type='date' className='calendar-picker' min={new Date().toISOString().split('T')[0]}  /> */}
			<DatePicker
				selected={startDate}
				onChange={dateChangeHandler}
				shouldCloseOnSelect={false}
				minDate={new Date()}
				className='bg-neutral-700 rounded-md p-1 hover:bg-neutral-600 transition-all'
				wrapperClassName='datePicker'
				customInput={<button className='material-symbols-outlined text-gray-100'>calendar_month</button>}
			/>
		</div>
	);
};

export default TodoHeader;
