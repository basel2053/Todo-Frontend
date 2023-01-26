const Button = (props: {
	children: React.ReactNode;
	className: string;
	type?: 'submit' | 'button';
	disabled?: boolean;
	onClick?: React.MouseEventHandler;
}) => {
	return (
		<button
			className={`border-2 rounded-xl font-bold  ${props.className}`}
			disabled={props.disabled}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
};

export default Button;
