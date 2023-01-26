import { ChangeEventHandler, FocusEventHandler } from 'react';

const Input = (props: {
	type: string;
	className?: string;
	name: string;
	id?: string;
	value?: string;
	onChange?: ChangeEventHandler;
	onBlur?: FocusEventHandler;
}) => {
	return (
		<input
			type={props.type}
			className={`px-3 py-2 bg-transparent text-lg border rounded-xl font-medium w-1/2  text-gray-50  focus:outline-none ${props.className}`}
			name={props.name}
			id={props.id}
			value={props.value}
			onChange={props.onChange}
			onBlur={props.onBlur}
		/>
	);
};

export default Input;
