import { createPortal } from 'react-dom';
import Card from '../../UI/Card';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import useInput from '../../../hooks/use-input';

const Backdrop = (props: { onCloseModal: React.MouseEventHandler }) => {
	return (
		<div className='w-screen h-screen fixed z-30 top-0 left-0 bg-black opacity-50' onClick={props.onCloseModal}></div>
	);
};

const ModalOverlay = (props: { onCloseModal: React.MouseEventHandler; onCreateTodo: Function }) => {
	const titleInput = useInput((val: string) => val.trim().length >= 2 && val.trim().length <= 30);
	const dateInput = useInput((val: Date) => String(val).length !== 0);
	let formIsValid = false;
	if (titleInput.isValid && dateInput.isValid) {
		formIsValid = true;
	}
	const createHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		props.onCreateTodo({ title: titleInput.value, status: 'unfinished', endDate: dateInput.value });
	};
	return (
		<Card className='fixed z-30 w-1/3 m-auto inset-x-0 top-[20%] min-h-[50vh] bg-neutral-800 border-[2px] border-b-[3px] shadow-lg'>
			<form onSubmit={createHandler} className='flex flex-col items-center mt-5'>
				<label htmlFor='title' className='block text-amber-300 text-3xl mb-2'>
					Title:
				</label>
				<Input
					type='text'
					name='title'
					id='title'
					onChange={titleInput.inputChangeHandler}
					onBlur={titleInput.inputBlurHandler}
					className={titleInput.hasError ? 'w-3/4 py-3 border-rose-500' : 'w-3/4 py-3'}
				/>
				{titleInput.hasError && (
					<p className='text-xs font-medium mt-1 text-rose-500'>Title must be between 2-30 characters.</p>
				)}
				<label htmlFor='endDate' className='block text-amber-300 text-3xl mb-2 mt-4'>
					End-Date:
				</label>
				<Input
					type='datetime-local'
					name='endDate'
					id='endDate'
					onChange={dateInput.inputChangeHandler}
					onBlur={dateInput.inputBlurHandler}
					className={dateInput.hasError ? 'specific-date py-0 w-3/4 border-rose-500' : 'specific-date py-0 w-3/4'}
				/>
				<div className='flex justify-evenly w-3/4 mt-5'>
					<Button
						className='py-1 px-4 border-gray-300 text-gray-300 hover:bg-neutral-500 hover:text-gray-50 transition-all cursor-pointer border-2 rounded-xl font-bold inline-block text-3xl mb-10 mt-6'
						onClick={props.onCloseModal}
					>
						Cancel
					</Button>
					<Button
						className='py-1 px-4 border-amber-300 text-amber-300 hover:bg-amber-400  hover:text-gray-50 transition-all cursor-pointer border-2 rounded-xl font-bold inline-block text-3xl mb-10 mt-6 disabled:text-amber-200 disabled:border-amber-200 disabled:hover:bg-transparent'
						disabled={!formIsValid}
					>
						Create
					</Button>
				</div>
			</form>
		</Card>
	);
};

const Modal = (props: { onCloseModal: React.MouseEventHandler; onCreateTodo: Function }) => {
	return (
		<>
			{createPortal(
				<Backdrop onCloseModal={props.onCloseModal} />,
				document.getElementById('root-backdrop') as HTMLElement
			)}
			{createPortal(
				<ModalOverlay onCloseModal={props.onCloseModal} onCreateTodo={props.onCreateTodo} />,
				document.getElementById('root-modal') as HTMLElement
			)}
		</>
	);
};

export default Modal;
