const Button = (props: { children: React.ReactNode; className: string }) => {
	return <button className={`border-2 rounded-xl font-bold  ${props.className}`}>{props.children}</button>;
};

export default Button;
